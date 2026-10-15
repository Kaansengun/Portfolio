import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const alt = "Kaan Şengün, Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          background: "linear-gradient(135deg, #f4f7f5 0%, #eceefe 55%, #e6faf3 100%)",
          color: "#0b0b16",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#17148a",
            color: "#fff",
            fontSize: 40,
            fontWeight: 700,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          KŞ
        </div>
        <div style={{ display: "flex", marginTop: 48, fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>Kaan Şengün</div>
        <div style={{ display: "flex", marginTop: 12, fontSize: 44, color: "#17148a" }}>Software Engineer</div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#5f6070", maxWidth: 900, lineHeight: 1.35 }}>
          {t("tagline")}
        </div>
      </div>
    ),
    size,
  );
}
