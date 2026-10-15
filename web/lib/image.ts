/** SVG placeholders skip the image optimizer; real screenshots go through it. */
export const isSvg = (src: string) => src.endsWith(".svg");

/** App Store marketing images already contain a device frame, so they render without one. */
export const isStoreImage = (src: string) => src.startsWith("/images/store/");
