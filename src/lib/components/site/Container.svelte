<script lang="ts">
  import type { Snippet } from "svelte";

  type ContainerWidth = "default" | "narrow" | "wide" | "full-bleed";

  type Props = {
    children: Snippet;
    width?: ContainerWidth;
    flex?: boolean;
  };

  let { children, width = "default", flex = false }: Props = $props();

  const className = $derived(
    [width !== "default" ? width : "", flex ? "flex" : ""]
      .filter(Boolean)
      .join(" "),
  );
</script>

<div class={className}>
  {@render children()}
</div>

<style>
  div {
    margin-inline: auto;
    max-width: 1280px;
    padding-inline: clamp(1.25rem, 10vw, 8rem);
    width: 100%;
  }

  .narrow {
    max-width: 1024px;
  }

  .wide {
    max-width: 1440px;
  }

  .full-bleed {
    max-width: none;
  }

  .flex {
    display: flex;
  }

  @media (max-width: 1024px) {
    div {
      padding-inline: clamp(1.125rem, 4vw, 2rem);
    }
  }

  @media (max-width: 1600px) {
    div.full-bleed {
      padding-inline: clamp(1.125rem, 4vw, 2rem);
    }
}
</style>
