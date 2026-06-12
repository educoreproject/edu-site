import {createReadStream, existsSync} from 'node:fs'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-06-01'})

const pdfPath = '/Users/mzebley/Downloads/dsu event images/DSU Glossary_Terms_Education_Skills_Technology.pdf'
const pdfFilename = 'DSU Glossary_Terms_Education_Skills_Technology.pdf'

const categories = ['All terms', 'Education', 'Skills/Talent/Workforce', 'Technology']

const terms = [
	{"term": "504 Plan", "definition": "Education accommodations under Section 504", "category": "Education"},
	{"term": "AACRAO", "definition": "American Association of Collegiate Registrars and Admissions Officers", "category": "Education"},
	{"term": "Academic Program", "definition": "A defined course of study leading to a credential", "category": "Education"},
	{"term": "Accreditation", "definition": "Formal recognition of educational quality", "category": "Education"},
	{"term": "Articulation Agreement", "definition": "Agreement for credit transfer between institutions", "category": "Education"},
	{"term": "Bridge Program", "definition": "Program designed to support academic transitions", "category": "Education"},
	{"term": "Caliper", "definition": "Standard for learning analytics", "category": "Education"},
	{"term": "CASE", "definition": "Competency and Academic Standards Exchange", "category": "Education"},
	{"term": "CEDS", "definition": "Common Education Data Standards", "category": "Education"},
	{"term": "CIP", "definition": "Classification of Instructional Programs", "category": "Education"},
	{"term": "CLR", "definition": "Comprehensive Learner Record", "category": "Education"},
	{"term": "Comparable", "definition": "Describes a course or credential that is sufficiently similar in learning outcomes or content", "category": "Education"},
	{"term": "Common Cartridge", "definition": "Standard for educational content packaging", "category": "Education"},
	{"term": "Common Course Number", "definition": "A shared numbering system used across institutions to indicate aligned or equivalent courses", "category": "Education"},
	{"term": "Competency-Based Education", "definition": "Education based on demonstrated mastery", "category": "Education"},
	{"term": "Credit Articulation", "definition": "Mapping credit across institutions", "category": "Education"},
	{"term": "Credit for Prior Learning", "definition": "Recognition of non-classroom learning", "category": "Education"},
	{"term": "Credit Hour", "definition": "Unit of measurement for educational credit", "category": "Education"},
	{"term": "Crosswalk", "definition": "A tool or table used to show relationships between different standards, codes, or curricula", "category": "Education"},
	{"term": "CTDL", "definition": "Credential Transparency Description Language", "category": "Education"},
	{"term": "CTE", "definition": "Career and Technical Education", "category": "Education"},
	{"term": "Dual Enrollment", "definition": "College courses taken in high school", "category": "Education"},
	{"term": "EDU", "definition": "Common abbreviation for 'education' or used in .edu domain names for educational institutions", "category": "Education"},
	{"term": "Equivalency", "definition": "Recognition that two or more courses or credentials are of equal value or content", "category": "Education"},
	{"term": "FERPA", "definition": "Family Educational Rights and Privacy Act", "category": "Education"},
	{"term": "GEAR UP", "definition": "Gaining Early Awareness and Readiness for Undergraduate Programs", "category": "Education"},
	{"term": "GEOCODE", "definition": "a shared community based institutional provider identify registry developed by PESC members.", "category": "Education"},
	{"term": "GED", "definition": "General Educational Development", "category": "Education"},
	{"term": "IEP", "definition": "Individualized Education Program", "category": "Education"},
	{"term": "IPEDS", "definition": "Integrated Postsecondary Education Data System", "category": "Education"},
	{"term": "LMS", "definition": "Learning Management System", "category": "Education"},
	{"term": "Learning Opportunity", "definition": "A structured learning experience", "category": "Education"},
	{"term": "Learning Pathway", "definition": "A sequence of learning experiences", "category": "Education"},
	{"term": "LEA", "definition": "Local Education Agency", "category": "Education"},
	{"term": "LTI", "definition": "Learning Tools Interoperability", "category": "Education"},
	{"term": "MTSS", "definition": "Multi-Tiered System of Supports", "category": "Education"},
	{"term": "NACUBO", "definition": "National Association of College and University Business Officers", "category": "Education"},
	{"term": "NSC", "definition": "National Student Clearinghouse", "category": "Education"},
	{"term": "OER", "definition": "Open Educational Resources", "category": "Education"},
	{"term": "OneRoster", "definition": "Standard for rostering data", "category": "Education"},
	{"term": "OpenBadges", "definition": "Digital credentialing format", "category": "Education"},
	{"term": "OPEID", "definition": "Office of Postsecondary Education Identifier", "category": "Education"},
	{"term": "P20", "definition": "Preschool through graduate school and workforce - a lifelong learning continuum encompassing early childhood through adult education and career readiness", "category": "Education"},
	{"term": "PESC", "definition": "Postsecondary Electronic Standards Council", "category": "Education"},
	{"term": "PESC XML", "definition": "XML data format for education exchange", "category": "Education"},
	{"term": "PLA", "definition": "Prior Learning Assessment", "category": "Education"},
	{"term": "PLAR", "definition": "Prior Learning Assessment and Recognition", "category": "Education"},
	{"term": "Precedent", "definition": "A prior decision or course evaluation used to inform future transfer or credit decisions", "category": "Education"},
	{"term": "QTI", "definition": "Question and Test Interoperability", "category": "Education"},
	{"term": "RAISE", "definition": "Reimagining Aid Design and Evaluation", "category": "Education"},
	{"term": "Registrar", "definition": "Office handling academic records", "category": "Education"},
	{"term": "Remediation", "definition": "Non-credit instruction to build foundational skills", "category": "Education"},
	{"term": "Reverse Transfer", "definition": "Granting associate degrees retroactively", "category": "Education"},
	{"term": "RTI", "definition": "Response to Intervention", "category": "Education"},
	{"term": "SCED", "definition": "School Courses for the Exchange of Data", "category": "Education"},
	{"term": "SEA", "definition": "State Education Agency", "category": "Education"},
	{"term": "SEVIS", "definition": "Student and Exchange Visitor Information System", "category": "Education"},
	{"term": "SIS", "definition": "Student Information System", "category": "Education"},
	{"term": "Taxonomy", "definition": "Classification system (e.g., SCED, CIP)", "category": "Education"},
	{"term": "Term", "definition": "A fixed length of academic time (e.g., semester, quarter) during which courses are delivered", "category": "Education"},
	{"term": "Thin Common Cartridge", "definition": "Simplified version of Common Cartridge", "category": "Education"},
	{"term": "Transcript", "definition": "Record of a student's academic performance", "category": "Education"},
	{"term": "Transfer Agreement", "definition": "Formal contract outlining how credits transfer between institutions", "category": "Education"},
	{"term": "Transfer Credit", "definition": "Academic credit accepted from another institution", "category": "Education"},
	{"term": "TS130", "definition": "Transcript standard from PESC", "category": "Education"},
	{"term": "TRIO", "definition": "Federal outreach programs for disadvantaged students", "category": "Education"},
	{"term": "Apprenticeship", "definition": "A formal program that combines on-the-job training with classroom instruction, typically in skilled trades or technical fields", "category": "Skills/Talent/Workforce"},
	{"term": "ATS", "definition": "Applicant Tracking System", "category": "Skills/Talent/Workforce"},
	{"term": "Career Pathway", "definition": "Series of education and training leading to a career", "category": "Skills/Talent/Workforce"},
	{"term": "CLR", "definition": "Comprehensive Learner Record", "category": "Skills/Talent/Workforce"},
	{"term": "Co-Op", "definition": "Cooperative education program that integrates academic studies with paid, practical work experience", "category": "Skills/Talent/Workforce"},
	{"term": "Competency Framework", "definition": "System to define job-related capabilities", "category": "Skills/Talent/Workforce"},
	{"term": "Competency-Based Hiring", "definition": "Hiring based on demonstrated skills", "category": "Skills/Talent/Workforce"},
	{"term": "Credential Alignment", "definition": "Matching credentials to workforce needs", "category": "Skills/Talent/Workforce"},
	{"term": "Credential Engine", "definition": "Organization advancing credential transparency", "category": "Skills/Talent/Workforce"},
	{"term": "Digital Badge", "definition": "Visual representation of a skill or achievement", "category": "Skills/Talent/Workforce"},
	{"term": "Digital Wallet", "definition": "Tool to store credentials securely", "category": "Skills/Talent/Workforce"},
	{"term": "DOL", "definition": "Department of Labor", "category": "Skills/Talent/Workforce"},
	{"term": "Employer-Validated", "definition": "Endorsed by industry for relevance", "category": "Skills/Talent/Workforce"},
	{"term": "Equity Audit", "definition": "Review of fairness in access and outcomes", "category": "Skills/Talent/Workforce"},
	{"term": "Experiential Learning", "definition": "Learning through direct experience, such as internships, service learning, simulations, or project-based activities", "category": "Skills/Talent/Workforce"},
	{"term": "Hard Skills", "definition": "Technical, teachable skills", "category": "Skills/Talent/Workforce"},
	{"term": "HRIS", "definition": "Human Resource Information System", "category": "Skills/Talent/Workforce"},
	{"term": "ILOs", "definition": "Institutional Learning Outcomes", "category": "Skills/Talent/Workforce"},
	{"term": "Inclusive Hiring", "definition": "Hiring practices that reduce bias", "category": "Skills/Talent/Workforce"},
	{"term": "Internship", "definition": "Short-term work experience opportunity", "category": "Skills/Talent/Workforce"},
	{"term": "ISLO", "definition": "Institutional Student Learning Outcomes", "category": "Skills/Talent/Workforce"},
	{"term": "Job Architecture", "definition": "Framework for defining job roles and progression", "category": "Skills/Talent/Workforce"},
	{"term": "Job Ready", "definition": "Individual prepared for entry into workforce", "category": "Skills/Talent/Workforce"},
	{"term": "LER", "definition": "Learning and Employment Record", "category": "Skills/Talent/Workforce"},
	{"term": "Mentor", "definition": "An experienced individual who provides guidance and support", "category": "Skills/Talent/Workforce"},
	{"term": "Microcredential", "definition": "Small, focused credential for a specific skill", "category": "Skills/Talent/Workforce"},
	{"term": "NAICS", "definition": "North American Industry Classification System", "category": "Skills/Talent/Workforce"},
	{"term": "O*NET", "definition": "Occupational Information Network", "category": "Skills/Talent/Workforce"},
	{"term": "ReSkilling", "definition": "Training to shift into a new occupation", "category": "Skills/Talent/Workforce"},
	{"term": "Registered Apprenticeship", "definition": "Paid, structured workforce training", "category": "Skills/Talent/Workforce"},
	{"term": "SHRM", "definition": "Society for Human Resource Management", "category": "Skills/Talent/Workforce"},
	{"term": "Skill Gap Analysis", "definition": "Identification of missing skills for roles", "category": "Skills/Talent/Workforce"},
	{"term": "Skill Tagging", "definition": "Assigning metadata to learning resources", "category": "Skills/Talent/Workforce"},
	{"term": "Skills Taxonomy", "definition": "Structured classification of skills", "category": "Skills/Talent/Workforce"},
	{"term": "Soft Skills", "definition": "Non-technical skills like communication or teamwork", "category": "Skills/Talent/Workforce"},
	{"term": "Stackable Credential", "definition": "Credential that builds toward higher credentials", "category": "Skills/Talent/Workforce"},
	{"term": "Talent Marketplace", "definition": "Platform for matching talent with opportunities", "category": "Skills/Talent/Workforce"},
	{"term": "Talent Signal", "definition": "Verified indicator of skill or experience", "category": "Skills/Talent/Workforce"},
	{"term": "UpSkilling", "definition": "Training to enhance current skills", "category": "Skills/Talent/Workforce"},
	{"term": "WIOA", "definition": "Workforce Innovation and Opportunity Act", "category": "Skills/Talent/Workforce"},
	{"term": "Work-Based Learning", "definition": "Learning through work experiences", "category": "Skills/Talent/Workforce"},
	{"term": "WorkKeys", "definition": "Assessments for workplace skills", "category": "Skills/Talent/Workforce"},
	{"term": "AI", "definition": "Artificial Intelligence", "category": "Technology"},
	{"term": "ASCII Character Set", "definition": "American Standard Code for Information Interchange", "category": "Technology"},
	{"term": "Bar Code", "definition": "A machine-readable representation of data", "category": "Technology"},
	{"term": "Canonical Model", "definition": "Standard model for data exchange", "category": "Technology"},
	{"term": "Chatbot", "definition": "Automated conversational agent", "category": "Technology"},
	{"term": "CI/CD", "definition": "Continuous Integration / Continuous Delivery", "category": "Technology"},
	{"term": "CLI", "definition": "Command Line Interface", "category": "Technology"},
	{"term": "Cloud Computing", "definition": "On-demand computing services", "category": "Technology"},
	{"term": "Containerization", "definition": "Packaging software for portability", "category": "Technology"},
	{"term": "CRM", "definition": "Customer Relationship Management", "category": "Technology"},
	{"term": "CPU", "definition": "Central Processing Unit", "category": "Technology"},
	{"term": "Data Dictionary", "definition": "A centralized repository of information about data", "category": "Technology"},
	{"term": "Data Fabric", "definition": "Architecture for unified data access", "category": "Technology"},
	{"term": "Data Lake", "definition": "Storage for structured and unstructured data", "category": "Technology"},
	{"term": "Data Table", "definition": "A structured collection of related data entries", "category": "Technology"},
	{"term": "Data Warehouse", "definition": "Centralized data repository", "category": "Technology"},
	{"term": "DevOps", "definition": "Development and IT operations collaboration", "category": "Technology"},
	{"term": "DNS", "definition": "Domain Name System", "category": "Technology"},
	{"term": "DW", "definition": "Data Warehouse", "category": "Technology"},
	{"term": "EDI", "definition": "Electronic Data Interchange", "category": "Technology"},
	{"term": "Edge Computing", "definition": "Processing at or near the data source", "category": "Technology"},
	{"term": "Embedding", "definition": "Numeric representation of data", "category": "Technology"},
	{"term": "Encryption", "definition": "Securing data with cryptography", "category": "Technology"},
	{"term": "ERP", "definition": "Enterprise Resource Planning", "category": "Technology"},
	{"term": "Event Messaging", "definition": "Communication via discrete events", "category": "Technology"},
	{"term": "ETL", "definition": "Extract, Transform, Load process", "category": "Technology"},
	{"term": "GPU", "definition": "Graphics Processing Unit", "category": "Technology"},
	{"term": "HEX", "definition": "Hexadecimal - base-16 number system", "category": "Technology"},
	{"term": "HTML", "definition": "HyperText Markup Language", "category": "Technology"},
	{"term": "HTTP", "definition": "HyperText Transfer Protocol", "category": "Technology"},
	{"term": "HTTPS", "definition": "Secure HTTP", "category": "Technology"},
	{"term": "IDE", "definition": "Integrated Development Environment", "category": "Technology"},
	{"term": "IP Address", "definition": "Numeric identifier for networked devices", "category": "Technology"},
	{"term": "JSON", "definition": "JavaScript Object Notation", "category": "Technology"},
	{"term": "JSON-LD", "definition": "JSON for Linked Data", "category": "Technology"},
	{"term": "JWT", "definition": "JSON Web Token", "category": "Technology"},
	{"term": "LDS", "definition": "Longitudinal Data System", "category": "Technology"},
	{"term": "LLM", "definition": "Large Language Model", "category": "Technology"},
	{"term": "Middleware", "definition": "Software that connects applications", "category": "Technology"},
	{"term": "Microservices", "definition": "Small, independent services", "category": "Technology"},
	{"term": "ML", "definition": "Machine Learning", "category": "Technology"},
	{"term": "NLP", "definition": "Natural Language Processing", "category": "Technology"},
	{"term": "OCR", "definition": "Optical Character Recognition", "category": "Technology"},
	{"term": "OAuth", "definition": "Authorization protocol for APIs", "category": "Technology"},
	{"term": "ODS", "definition": "Operational Data Store", "category": "Technology"},
	{"term": "Open Source", "definition": "Software with freely available source code", "category": "Technology"},
	{"term": "OWL", "definition": "Web Ontology Language", "category": "Technology"},
	{"term": "PKI", "definition": "Public Key Infrastructure", "category": "Technology"},
	{"term": "Prompt Engineering", "definition": "Crafting inputs to guide AI output", "category": "Technology"},
	{"term": "Pub/Sub", "definition": "Publish/Subscribe messaging model", "category": "Technology"},
	{"term": "QR Code", "definition": "Quick Response Code", "category": "Technology"},
	{"term": "RAM", "definition": "Random Access Memory", "category": "Technology"},
	{"term": "RDF", "definition": "Resource Description Framework", "category": "Technology"},
	{"term": "REST", "definition": "Representational State Transfer", "category": "Technology"},
	{"term": "SAML", "definition": "Security Assertion Markup Language", "category": "Technology"},
	{"term": "Schema", "definition": "Structured data organization model", "category": "Technology"},
	{"term": "SDK", "definition": "Software Development Kit", "category": "Technology"},
	{"term": "SOAP", "definition": "Simple Object Access Protocol", "category": "Technology"},
	{"term": "SPARQL", "definition": "Query language for RDF data", "category": "Technology"},
	{"term": "SSD", "definition": "Solid State Drive", "category": "Technology"},
	{"term": "SSO", "definition": "Single Sign-On", "category": "Technology"},
	{"term": "Tokenization", "definition": "Text processing for language models", "category": "Technology"},
	{"term": "Version Control", "definition": "Managing changes in code", "category": "Technology"},
	{"term": "Virtualization", "definition": "Simulating hardware environments", "category": "Technology"},
	{"term": "WebAuthn", "definition": "Standard for web authentication", "category": "Technology"},
	{"term": "XML", "definition": "eXtensible Markup Language", "category": "Technology"},
] as const

function slugify(value: string) {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')
}

function toGlossaryTerm(term: (typeof terms)[number], index: number) {
	return {
		_key: `${slugify(term.category)}-${slugify(term.term)}-${index}`,
		_type: 'glossaryTerm',
		...term
	}
}

if (!existsSync(pdfPath)) {
	throw new Error(`Missing glossary PDF at ${pdfPath}`)
}

const asset = await client.assets.upload('file', createReadStream(pdfPath), {
	filename: pdfFilename,
	contentType: 'application/pdf'
})

await client.createIfNotExists({
	_id: 'resourcesGlossary',
	_type: 'resourcesGlossary',
	slug: {_type: 'slug', current: 'resources-glossary'}
})

const existing = await client.fetch<{_id: string} | null>(
	`*[_type == "resourcesGlossary" && slug.current == "resources-glossary"][0]{_id}`
)
const documentId = existing?._id ?? 'resourcesGlossary'

await client
	.patch(documentId)
	.set({
		categories,
		terms: terms.map(toGlossaryTerm),
		artifact: {
			label: 'Download the glossary PDF',
			file: {
				_type: 'file',
				asset: {
					_type: 'reference',
					_ref: asset._id
				}
			}
		}
	})
	.commit()

console.log(`Seeded ${terms.length} glossary terms and attached ${pdfFilename}.`)
