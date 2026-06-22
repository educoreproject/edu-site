# Contact Resend Email Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/contact` mailto submission with a server-side SvelteKit form action that sends the selected organization email through Resend.

**Architecture:** Keep the Sanity-managed contact page and `recipientOptions` dropdown as the source of allowed recipients, but validate the selected recipient again on the server before sending. Add a small server-only email module that parses form submissions, builds a Resend message, and sends with private Vercel environment variables; the page action coordinates validation, delivery, and inline success/error state.

**Tech Stack:** SvelteKit 2 form actions, Svelte 5 runes, Resend Node SDK, Vercel private environment variables, Sanity-backed contact content, Node 24 `node:test`, TypeScript.

---

## Current Status And Implementation Gate

This plan is saved before implementation on purpose. Do not start the code tasks until the Resend account setup is ready enough to provide real environment values.

Required external setup before code execution:

- Resend account exists.
- Sending domain is verified in Resend using the DNS records Resend provides.
- Resend API key is created for the project.
- Sender address is chosen on the verified domain, using the exact domain value shown as verified in Resend.
- Vercel Preview and Production environments can be updated with:
  - `RESEND_API_KEY`
  - `CONTACT_FROM_EMAIL`
  - `CONTACT_SUBJECT_PREFIX`

Reference docs for the implementer:

- Resend Node quickstart: https://resend.com/docs/send-with-nodejs
- Resend domain setup: https://resend.com/docs/dashboard/domains/introduction
- SvelteKit form actions: https://svelte.dev/docs/kit/form-actions
- Vercel environment variables: https://vercel.com/docs/environment-variables

## Scope Check

This is one cohesive implementation. It touches the existing contact page, server form handling, environment documentation, and tests for the email parser/sender boundary. It does not add user confirmation emails, file attachments, CRM integration, persistence, CAPTCHA, or a separate API endpoint.

## Assumptions

- The contact dropdown/content-contract work is present before this plan is executed:
  - `ContactPage.recipientOptions` exists.
  - `resolveContactPageContent()` falls back to direct/collaborative card emails.
  - `/contact` has a recipient `<select name="recipient">`.
- The recipient option value remains the recipient email. That email is not treated as secret because the current contact cards already expose email addresses.
- The form fields remain Sanity-driven through `page.fields`; server validation must use those field definitions instead of hard-coding only one local form shape.
- The default shell may use Node 25. When a build or install uses the wrong runtime, prefix commands with the Node 24 binary path already present on this machine:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run check
```

## File Structure

- Modify `package.json` and `package-lock.json`: add the `resend` runtime dependency.
- Modify `.env.example`: document private Resend/Vercel environment variables.
- Create `src/lib/server/contact-email.ts`: server-only parsing, validation, email message building, and Resend sending helpers.
- Create `src/routes/contact/+page.server.ts`: SvelteKit named form action that fetches the contact page, validates the posted recipient/fields, and calls the email helper.
- Modify `src/routes/contact/+page.svelte`: replace the `mailto:` action with `?/send`, preserve the recipient dropdown, add inline success/error UI, retain submitted values on validation failure, and add a hidden honeypot field.
- Modify `test/contact-recipient-routing.test.mjs`: update the source-contract test so the contact form no longer routes to mailto.
- Create `test/contact-resend-email.test.mjs`: focused tests for environment docs, dependency wiring, parsing/validation, message building, and page action markup.

---

### Task 1: Add Resend Dependency And Environment Contract

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.env.example`
- Test: `test/contact-resend-email.test.mjs`

- [ ] **Step 1: Write the failing dependency and env contract test**

Create `test/contact-resend-email.test.mjs`:

```js
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('contact email integration declares Resend dependency and private env vars', () => {
	const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
	const envExample = readFileSync('.env.example', 'utf8');

	assert.match(packageJson.dependencies?.resend ?? '', /^\^?\d+\.\d+\.\d+/);
	assert.match(envExample, /^RESEND_API_KEY=/m);
	assert.match(envExample, /^CONTACT_FROM_EMAIL=/m);
	assert.match(envExample, /^CONTACT_SUBJECT_PREFIX=Website contact$/m);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-resend-email.test.mjs
```

Expected: FAIL because `package.json` has no `resend` dependency and `.env.example` has no private Resend variables.

- [ ] **Step 3: Install Resend with the pinned runtime**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm install resend
```

Expected: `package.json` and `package-lock.json` change, with `resend` listed under `dependencies`.

- [ ] **Step 4: Document private env variables**

Append these lines to `.env.example`:

```dotenv
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_SUBJECT_PREFIX=Website contact
```

- [ ] **Step 5: Run the focused test and verify it passes**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-resend-email.test.mjs
```

Expected: PASS for `contact email integration declares Resend dependency and private env vars`.

- [ ] **Step 6: Commit**

Run:

```bash
git add package.json package-lock.json .env.example test/contact-resend-email.test.mjs
git commit -m "chore: add resend contact email dependency"
```

---

### Task 2: Add Server-Only Contact Email Helper

**Files:**
- Create: `src/lib/server/contact-email.ts`
- Modify: `test/contact-resend-email.test.mjs`

- [ ] **Step 1: Add failing parser and email-builder tests**

Append these tests to `test/contact-resend-email.test.mjs`:

```js
test('contact email helper validates recipients and required Sanity fields', () => {
	const script = `
		import { createServer } from 'vite';

		const server = await createServer({
			logLevel: 'silent',
			server: { middlewareMode: true },
			appType: 'custom'
		});

		try {
			const { parseContactForm } = await server.ssrLoadModule('/src/lib/server/contact-email.ts');
			const config = {
				fields: [
					{ label: 'Name', name: 'name', type: 'text', required: true },
					{ label: 'Email', name: 'email', type: 'email', required: true },
					{ label: 'Message', name: 'message', type: 'textarea', required: true }
				],
				recipientOptions: [
					{ label: 'Education Data Unlimited', email: 'edu@example.org' },
					{ label: 'Data Standards United', email: 'dsu@example.org' }
				]
			};

			const validData = new FormData();
			validData.set('recipient', 'dsu@example.org');
			validData.set('name', 'Ada Lovelace');
			validData.set('email', 'ada@example.org');
			validData.set('message', 'Can we talk about standards?');

			const invalidData = new FormData();
			invalidData.set('recipient', 'not-allowed@example.org');
			invalidData.set('name', '');
			invalidData.set('email', 'not-an-email');
			invalidData.set('message', '');

			console.log(JSON.stringify({
				valid: parseContactForm(validData, config),
				invalid: parseContactForm(invalidData, config)
			}));
		} finally {
			await server.close();
		}
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const result = JSON.parse(output);

	assert.equal(result.valid.ok, true);
	assert.equal(result.valid.submission.recipient.email, 'dsu@example.org');
	assert.equal(result.valid.submission.replyTo, 'ada@example.org');
	assert.deepEqual(result.invalid.errors, {
		recipient: 'Choose an organization to contact.',
		name: 'Name is required.',
		email: 'Enter a valid email address.',
		message: 'Message is required.'
	});
});

test('contact email helper builds safe Resend message content', () => {
	const script = `
		import { createServer } from 'vite';

		const server = await createServer({
			logLevel: 'silent',
			server: { middlewareMode: true },
			appType: 'custom'
		});

		try {
			const { buildContactEmailMessage } = await server.ssrLoadModule('/src/lib/server/contact-email.ts');
			const message = buildContactEmailMessage(
				{
					recipient: { label: 'Data Standards United', email: 'dsu@example.org' },
					replyTo: 'ada@example.org',
					values: {
						name: 'Ada Lovelace',
						email: 'ada@example.org',
						message: '<hello & goodbye>'
					},
					labels: {
						name: 'Name',
						email: 'Email',
						message: 'Message'
					}
				},
				{
					fromEmail: 'Website <contact@example.org>',
					subjectPrefix: 'Website contact'
				}
			);

			console.log(JSON.stringify(message));
		} finally {
			await server.close();
		}
	`;
	const output = execFileSync(process.execPath, ['--import', 'tsx', '--input-type=module', '-e', script], {
		encoding: 'utf8'
	});
	const message = JSON.parse(output);

	assert.equal(message.from, 'Website <contact@example.org>');
	assert.deepEqual(message.to, ['dsu@example.org']);
	assert.equal(message.replyTo, 'ada@example.org');
	assert.equal(message.subject, 'Website contact: Data Standards United');
	assert.match(message.text, /Message: <hello & goodbye>/);
	assert.match(message.html, /&lt;hello &amp; goodbye&gt;/);
});
```

- [ ] **Step 2: Run the focused tests and verify they fail**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-resend-email.test.mjs
```

Expected: FAIL because `src/lib/server/contact-email.ts` does not exist.

- [ ] **Step 3: Create the server-only helper**

Create `src/lib/server/contact-email.ts`:

```ts
import { env } from '$env/dynamic/private';
import { Resend } from 'resend';
import type { ContactField, ContactRecipient } from '$lib/content/types';

export type ContactEmailConfig = {
	fields: ContactField[];
	recipientOptions: ContactRecipient[];
};

export type ContactFormValues = Record<string, string>;
export type ContactFormErrors = Record<string, string>;

export type ParsedContactSubmission = {
	recipient: ContactRecipient;
	values: ContactFormValues;
	labels: Record<string, string>;
	replyTo?: string;
};

export type ContactParseResult =
	| {
			ok: true;
			submission: ParsedContactSubmission;
	  }
	| {
			ok: false;
			values: ContactFormValues;
			errors: ContactFormErrors;
			message: string;
			blocked?: boolean;
	  };

export type ContactEmailMessage = {
	from: string;
	to: string[];
	replyTo?: string;
	subject: string;
	text: string;
	html: string;
};

export type ContactEmailClient = {
	emails: {
		send: (message: ContactEmailMessage) => Promise<{
			data?: { id?: string } | null;
			error?: { message?: string; name?: string } | null;
		}>;
	};
};

export type SendContactEmailOptions = {
	apiKey?: string;
	fromEmail?: string;
	subjectPrefix?: string;
	client?: ContactEmailClient;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stringValue(value: FormDataEntryValue | null): string {
	return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

export function parseContactForm(formData: FormData, config: ContactEmailConfig): ContactParseResult {
	const recipientEmail = stringValue(formData.get('recipient'));
	const honeypot = stringValue(formData.get('website'));
	const recipient = config.recipientOptions.find((option) => option.email === recipientEmail);
	const values: ContactFormValues = { recipient: recipientEmail };
	const labels: Record<string, string> = {};
	const errors: ContactFormErrors = {};
	let replyTo: string | undefined;

	if (honeypot) {
		return {
			ok: false,
			values,
			errors: {},
			message: 'Thanks. Your message has been sent.',
			blocked: true
		};
	}

	if (!recipient) {
		errors.recipient = 'Choose an organization to contact.';
	}

	for (const field of config.fields) {
		const value = stringValue(formData.get(field.name));

		values[field.name] = value;
		labels[field.name] = field.label;

		if (field.required && !value) {
			errors[field.name] = `${field.label} is required.`;
			continue;
		}

		if (field.type === 'email' && value && !emailPattern.test(value)) {
			errors[field.name] = 'Enter a valid email address.';
			continue;
		}

		if (field.type === 'email' && value) {
			replyTo = value;
		}
	}

	if (Object.keys(errors).length || !recipient) {
		return {
			ok: false,
			values,
			errors,
			message: 'Check the highlighted fields and try again.'
		};
	}

	return {
		ok: true,
		submission: {
			recipient,
			values,
			labels,
			replyTo
		}
	};
}

export function buildContactEmailMessage(
	submission: ParsedContactSubmission,
	options: { fromEmail: string; subjectPrefix: string }
): ContactEmailMessage {
	const rows = Object.entries(submission.values).filter(([name]) => name !== 'recipient');
	const textLines = [
		`Recipient: ${submission.recipient.label} <${submission.recipient.email}>`,
		'',
		...rows.map(([name, value]) => `${submission.labels[name] ?? name}: ${value || '(blank)'}`)
	];
	const htmlRows = rows
		.map(
			([name, value]) =>
				`<tr><th align="left" valign="top">${escapeHtml(
					submission.labels[name] ?? name
				)}</th><td>${escapeHtml(value || '(blank)').replaceAll('\n', '<br>')}</td></tr>`
		)
		.join('');

	return {
		from: options.fromEmail,
		to: [submission.recipient.email],
		replyTo: submission.replyTo,
		subject: `${options.subjectPrefix}: ${submission.recipient.label}`,
		text: textLines.join('\n'),
		html: `<h2>Website contact request</h2><p><strong>Recipient:</strong> ${escapeHtml(
			submission.recipient.label
		)}</p><table cellpadding="6" cellspacing="0">${htmlRows}</table>`
	};
}

export async function sendContactEmail(
	submission: ParsedContactSubmission,
	options: SendContactEmailOptions = {}
): Promise<{ ok: true; id?: string } | { ok: false; message: string }> {
	const apiKey = options.apiKey ?? env.RESEND_API_KEY;
	const fromEmail = options.fromEmail ?? env.CONTACT_FROM_EMAIL;
	const subjectPrefix = options.subjectPrefix ?? env.CONTACT_SUBJECT_PREFIX ?? 'Website contact';

	if (!apiKey || !fromEmail) {
		return {
			ok: false,
			message: 'Contact email is not configured.'
		};
	}

	const client = options.client ?? new Resend(apiKey);
	const result = await client.emails.send(
		buildContactEmailMessage(submission, {
			fromEmail,
			subjectPrefix
		})
	);

	if (result.error) {
		return {
			ok: false,
			message: result.error.message ?? 'Contact email could not be sent.'
		};
	}

	return {
		ok: true,
		id: result.data?.id
	};
}
```

- [ ] **Step 4: Run the focused tests and verify they pass**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-resend-email.test.mjs
```

Expected: PASS for dependency/env, parser validation, and message builder tests.

- [ ] **Step 5: Run type checking**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run check
```

Expected: `svelte-check found 0 errors and 0 warnings`.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/lib/server/contact-email.ts test/contact-resend-email.test.mjs
git commit -m "feat: add contact email message builder"
```

---

### Task 3: Add Contact Page Server Action

**Files:**
- Create: `src/routes/contact/+page.server.ts`
- Modify: `test/contact-resend-email.test.mjs`

- [ ] **Step 1: Add failing source-contract test for the server action**

Append this test to `test/contact-resend-email.test.mjs`:

```js
test('contact route exposes a SvelteKit action that sends validated contact email', () => {
	const source = readFileSync('src/routes/contact/+page.server.ts', 'utf8');

	assert.match(source, /export const actions/);
	assert.match(source, /send:\s*async/);
	assert.match(source, /await getContactPage\(\)/);
	assert.match(source, /parseContactForm\(formData,/);
	assert.match(source, /await sendContactEmail\(parsed\.submission\)/);
	assert.match(source, /fail\(400/);
	assert.match(source, /fail\(502/);
});
```

- [ ] **Step 2: Run the focused test and verify it fails**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-resend-email.test.mjs
```

Expected: FAIL because `src/routes/contact/+page.server.ts` does not exist.

- [ ] **Step 3: Create the SvelteKit action**

Create `src/routes/contact/+page.server.ts`:

```ts
import { fail } from '@sveltejs/kit';
import { getContactPage } from '$lib/content/site';
import { parseContactForm, sendContactEmail } from '$lib/server/contact-email';
import type { Actions } from './$types';

function valuesFromFormData(formData: FormData): Record<string, string> {
	const values: Record<string, string> = {};

	for (const [key, value] of formData.entries()) {
		if (typeof value === 'string') {
			values[key] = value;
		}
	}

	return values;
}

export const actions: Actions = {
	send: async ({ request }) => {
		const formData = await request.formData();
		let page: Awaited<ReturnType<typeof getContactPage>>;

		try {
			page = await getContactPage();
		} catch (error) {
			return fail(500, {
				success: false,
				message: 'The contact form is temporarily unavailable. Please try again later.',
				errors: {
					form: 'Contact content could not be loaded.'
				},
				values: valuesFromFormData(formData)
			});
		}

		const parsed = parseContactForm(formData, {
			fields: page.fields,
			recipientOptions: page.recipientOptions
		});

		if (!parsed.ok) {
			if (parsed.blocked) {
				return {
					success: true,
					message: parsed.message
				};
			}

			return fail(400, {
				success: false,
				message: parsed.message,
				errors: parsed.errors,
				values: parsed.values
			});
		}

		const emailResult = await sendContactEmail(parsed.submission);

		if (!emailResult.ok) {
			return fail(502, {
				success: false,
				message: 'Your message could not be sent. Please try again later.',
				errors: {
					form: emailResult.message
				},
				values: parsed.submission.values
			});
		}

		return {
			success: true,
			message: 'Thanks. Your message has been sent.'
		};
	}
};
```

- [ ] **Step 4: Run the focused test and verify it passes**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-resend-email.test.mjs
```

Expected: PASS for the server action source-contract test.

- [ ] **Step 5: Run type checking**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run check
```

Expected: `svelte-check found 0 errors and 0 warnings`.

- [ ] **Step 6: Commit**

Run:

```bash
git add src/routes/contact/+page.server.ts test/contact-resend-email.test.mjs
git commit -m "feat: add contact form server action"
```

---

### Task 4: Replace Mailto Form With Server Action UI

**Files:**
- Modify: `src/routes/contact/+page.svelte`
- Modify: `test/contact-recipient-routing.test.mjs`
- Modify: `test/contact-resend-email.test.mjs`

- [ ] **Step 1: Update failing contact form routing tests**

In `test/contact-recipient-routing.test.mjs`, replace the `contact form routes submission to the selected recipient` test with:

```js
test('contact form posts to the SvelteKit email action', () => {
	const source = readFileSync('src/routes/contact/+page.svelte', 'utf8');

	assert.match(source, /<form[\s\S]*?action="\?\/send"/);
	assert.match(source, /<form[\s\S]*?method="POST"/);
	assert.doesNotMatch(source, /contactAction = \$derived/);
	assert.doesNotMatch(source, /mailto:/);
	assert.doesNotMatch(source, /enctype="text\/plain"/);
	assert.match(source, /<select[\s\S]*?bind:value=\{selectedRecipientEmail\}/);
	assert.match(source, /name="recipient"/);
});
```

Append this test to `test/contact-resend-email.test.mjs`:

```js
test('contact page renders action feedback, retained values, and spam honeypot', () => {
	const source = readFileSync('src/routes/contact/+page.svelte', 'utf8');

	assert.match(source, /form\?:\s*ContactActionData/);
	assert.match(source, /role=\{form\.success \? 'status' : 'alert'\}/);
	assert.match(source, /form\.errors\?\.recipient/);
	assert.match(source, /form\.values\?\.recipient/);
	assert.match(source, /name="website"/);
	assert.match(source, /\.honeypot/);
	assert.match(source, /\.field-error/);
});
```

- [ ] **Step 2: Run focused tests and verify they fail**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-recipient-routing.test.mjs test/contact-resend-email.test.mjs
```

Expected: FAIL because the contact page still uses the mailto action and lacks action feedback.

- [ ] **Step 3: Update the contact page script**

In `src/routes/contact/+page.svelte`, replace the current `<script lang="ts">` block with:

```svelte
<script lang="ts">
	import Button from '$lib/components/site/Button.svelte';
	import Container from '$lib/components/site/Container.svelte';
	import Hero from '$lib/components/site/Hero.svelte';
	import PageFooter from '$lib/components/site/PageFooter.svelte';
	import PageCtas from '$lib/components/site/PageCtas.svelte';
	import SectionChrome from '$lib/components/site/SectionChrome.svelte';
	import type { ContactPage, SiteChrome } from '$lib/content/types';

	type ContactActionData = {
		success?: boolean;
		message?: string;
		errors?: Record<string, string>;
		values?: Record<string, string>;
	};

	type Props = {
		data: {
			page: ContactPage;
			chrome: SiteChrome;
		};
		form?: ContactActionData;
	};

	let { data, form }: Props = $props();
	let page = $derived(data.page);
	let chrome = $derived(data.chrome);
	let selectedRecipientEmail = $state('');

	$effect(() => {
		const postedRecipientEmail = form?.values?.recipient ?? '';

		if (page.recipientOptions.some((recipient) => recipient.email === postedRecipientEmail)) {
			selectedRecipientEmail = postedRecipientEmail;
			return;
		}

		if (page.recipientOptions.some((recipient) => recipient.email === selectedRecipientEmail)) {
			return;
		}

		selectedRecipientEmail = page.recipientOptions[0]?.email ?? '';
	});

	function getInputType(type: string | undefined) {
		return type === 'email' ? 'email' : 'text';
	}
</script>
```

- [ ] **Step 4: Update the form opening, recipient field, and feedback UI**

In `src/routes/contact/+page.svelte`, replace the `<form ...>` opening through the recipient field with:

```svelte
<form aria-labelledby="contact-heading" action="?/send" method="POST">
	<div class="form-header">
		<p class="eyebrow">{page.hero.chip}</p>
		<h2 id="contact-heading">{page.hero.title}</h2>
	</div>

	{#if form?.message}
		<p
			class="form-message"
			class:success={form.success}
			class:error={!form.success}
			role={form.success ? 'status' : 'alert'}
		>
			{form.message}
		</p>
	{/if}

	<div class="field-grid">
		<div class="field full">
			<label for="contact-recipient">Organization</label>
			<select
				id="contact-recipient"
				name="recipient"
				bind:value={selectedRecipientEmail}
				required
				aria-invalid={form?.errors?.recipient ? 'true' : undefined}
				aria-describedby={form?.errors?.recipient ? 'contact-recipient-error' : undefined}
			>
				{#each page.recipientOptions as recipient}
					<option value={recipient.email}>{recipient.label}</option>
				{/each}
			</select>
			{#if form?.errors?.recipient}
				<p class="field-error" id="contact-recipient-error">{form.errors.recipient}</p>
			{/if}
		</div>
```

- [ ] **Step 5: Update each generated field to retain failed values and show errors**

In `src/routes/contact/+page.svelte`, replace the existing `{#each page.fields as field}` block with:

```svelte
{#each page.fields as field}
	<div class="field" class:full={field.full || field.type === 'textarea'}>
		<label for={`contact-${field.name}`}>{field.label}</label>
		{#if field.type === 'textarea'}
			<textarea
				id={`contact-${field.name}`}
				name={field.name}
				placeholder={field.placeholder}
				required={field.required}
				aria-invalid={form?.errors?.[field.name] ? 'true' : undefined}
				aria-describedby={form?.errors?.[field.name] ? `contact-${field.name}-error` : undefined}
			>{form?.values?.[field.name] ?? ''}</textarea>
		{:else}
			<input
				id={`contact-${field.name}`}
				name={field.name}
				type={getInputType(field.type)}
				placeholder={field.placeholder}
				required={field.required}
				value={form?.values?.[field.name] ?? ''}
				aria-invalid={form?.errors?.[field.name] ? 'true' : undefined}
				aria-describedby={form?.errors?.[field.name] ? `contact-${field.name}-error` : undefined}
			/>
		{/if}
		{#if form?.errors?.[field.name]}
			<p class="field-error" id={`contact-${field.name}-error`}>{form.errors[field.name]}</p>
		{/if}
	</div>
{/each}

<div class="honeypot" aria-hidden="true">
	<label for="contact-website">Website</label>
	<input id="contact-website" name="website" tabindex="-1" autocomplete="off" />
</div>
```

- [ ] **Step 6: Add feedback and honeypot styles**

In `src/routes/contact/+page.svelte`, add these styles before `.side-panel`:

```css
.form-message {
	border-radius: 4px;
	font-family: var(--ec-font-sans);
	font-size: 0.9375rem;
	font-weight: 700;
	margin: 0;
	padding: 0.875rem 1rem;
}

.form-message.success {
	background: color-mix(in srgb, var(--ec-teal-dark) 10%, var(--ec-white));
	color: var(--ec-teal-darker);
}

.form-message.error {
	background: color-mix(in srgb, #b42318 9%, var(--ec-white));
	color: #8a1f14;
}

.field-error {
	color: #8a1f14;
	font-family: var(--ec-font-sans);
	font-size: 0.875rem;
	font-weight: 700;
	line-height: 1.35;
	margin: 0;
}

.honeypot {
	height: 1px;
	left: -100vw;
	overflow: hidden;
	position: absolute;
	top: auto;
	width: 1px;
}
```

- [ ] **Step 7: Run focused tests and verify they pass**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-recipient-routing.test.mjs test/contact-resend-email.test.mjs
```

Expected: PASS for contact routing and Resend contact tests.

- [ ] **Step 8: Run Svelte checks**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run check
```

Expected: `svelte-check found 0 errors and 0 warnings`.

- [ ] **Step 9: Commit**

Run:

```bash
git add src/routes/contact/+page.svelte test/contact-recipient-routing.test.mjs test/contact-resend-email.test.mjs
git commit -m "feat: post contact form to server action"
```

---

### Task 5: Verify Delivery With Resend And Vercel Environment

**Files:**
- No source file changes expected.
- Verify Vercel project environment values.

- [ ] **Step 1: Add local private env values**

Add `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_SUBJECT_PREFIX` to local `.env` using the real values from the Resend account and verified sending domain. Keep `CONTACT_SUBJECT_PREFIX` set to `Website contact` unless the project owner chooses different public-facing wording before launch.

Expected: `.env` remains untracked.

- [ ] **Step 2: Run full local verification with Node 24**

Run:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-recipient-routing.test.mjs test/contact-resend-email.test.mjs test/shared-section-styles.test.mjs test/shared-cta-content.test.mjs test/site-pages-navigation.test.mjs test/shared-link-destinations.test.mjs
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run check
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run studio:build
```

Expected:

- Node tests report 0 failures.
- `npm run check` reports 0 errors and 0 warnings.
- `npm run build` exits 0 and adapter-vercel completes.
- `npm run studio:build` exits 0.

- [ ] **Step 3: Configure Vercel environment variables**

Set these variables in Vercel for Preview and Production:

```txt
RESEND_API_KEY
CONTACT_FROM_EMAIL
CONTACT_SUBJECT_PREFIX
```

Expected: `RESEND_API_KEY` is private and never prefixed with `PUBLIC_`.

- [ ] **Step 4: Send a real preview test message**

Deploy preview using the repo script:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run deploy:preview
```

Open the preview `/contact` page, submit one test message to each recipient option, and confirm the selected destination receives the message.

Expected:

- The form shows "Thanks. Your message has been sent."
- The received email subject starts with `Website contact:`.
- The received email body includes recipient, field labels, submitted values, and escaped message content.
- Replying to the received email targets the submitter email address.

- [ ] **Step 5: Commit final source fixes if source changed**

If no source changed during delivery verification, do not create a commit. If a source fix was required, run `git status --short`, review the exact changed source files, stage only those files, and commit:

```bash
git commit -m "fix: polish contact email delivery"
```

---

## Final Verification Checklist

Run these commands before calling implementation complete:

```bash
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH node --test test/contact-recipient-routing.test.mjs test/contact-resend-email.test.mjs test/shared-section-styles.test.mjs test/shared-cta-content.test.mjs test/site-pages-navigation.test.mjs test/shared-link-destinations.test.mjs
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run check
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run build
env PATH=/Users/mzebley/.nvm/versions/node/v24.16.0/bin:$PATH npm run studio:build
```

Expected final state:

- `/contact` form posts to `?/send`, not `mailto:`.
- Server action validates the selected recipient against Sanity-resolved `recipientOptions`.
- Server action validates all required Sanity-defined fields.
- Resend sends from `CONTACT_FROM_EMAIL`.
- Resend sends to the selected recipient only after server validation.
- User email is used as `replyTo`, not as the sending address.
- Invalid submissions retain user-entered values and show field-specific errors.
- A filled `website` honeypot returns a success-shaped response without sending email.
- Build and Studio build pass under Node 24.

## Self-Review Notes

- Spec coverage: account prerequisites, dependency, server helper, server action, contact UI, tests, Vercel env setup, and delivery verification are each covered by tasks.
- Placeholder scan: no task relies on unspecified code; environment values are explicitly named and blocked on account setup.
- Type consistency: `ContactRecipient`, `ContactField`, `parseContactForm`, `buildContactEmailMessage`, and `sendContactEmail` names match across tests, helper code, and action code.
