/** Id of the style that hides the catalog results until a filtered URL is applied. */
export const CATALOG_PENDING_STYLE_ID = "catalog-pending";

// Runs while the HTML is still parsing, before the catalog paints. The
// prerendered catalog always shows every product, so a shared link like
// ?kategorija=chips would otherwise flash the full list until the filter is
// applied after hydration. ProductShowcase removes this style once it has.
const script = `if(/[?&](kategorija|ukus)=/.test(location.search)){var s=document.createElement("style");s.id="${CATALOG_PENDING_STYLE_ID}";s.textContent="[data-catalog-results]{visibility:hidden}";document.head.appendChild(s)}`;

export function CatalogPendingStyle() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
