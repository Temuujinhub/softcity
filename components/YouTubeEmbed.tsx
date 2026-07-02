import { getYouTubeEmbedUrl } from "@/lib/youtube";

interface Props {
  url: string;
  title?: string;
  className?: string;
}

/**
 * YouTube линк (watch/youtu.be/shorts гэх мэт дурын хэлбэр) хүлээн авч
 * хариуцлагатай (responsive) embed тоглуулагч харуулна.
 */
export default function YouTubeEmbed({ url, title, className }: Props) {
  const embedUrl = getYouTubeEmbedUrl(url);
  if (!embedUrl) {
    return (
      <div className={`aspect-video bg-stone-100 flex items-center justify-center text-stone-400 text-sm ${className || ""}`}>
        Видео линк буруу байна
      </div>
    );
  }
  return (
    <div className={`aspect-video bg-black ${className || ""}`}>
      <iframe
        src={embedUrl}
        title={title || "Видео"}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
