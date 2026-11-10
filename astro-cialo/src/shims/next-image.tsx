import type { CSSProperties, ImgHTMLAttributes } from "react";

type ImageSource = string | { src?: string };

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: ImageSource;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoadingComplete?: () => void;
}

const resolveSrc = (src: ImageSource) => {
  if (typeof src === "string") {
    return src;
  }

  return src?.src ?? "";
};

export default function Image({
  src,
  alt,
  fill = false,
  priority = false,
  style,
  width,
  height,
  sizes,
  quality,
  placeholder,
  blurDataURL,
  unoptimized,
  onLoadingComplete,
  loading,
  fetchPriority,
  ...rest
}: ImageProps) {
  const imageStyle: CSSProperties = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        ...style
      }
    : {
        ...style
      };

  return (
    <img
      src={resolveSrc(src)}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      sizes={sizes}
      loading={priority ? "eager" : loading ?? "lazy"}
      fetchPriority={priority ? "high" : fetchPriority}
      style={imageStyle}
      {...rest}
    />
  );
}

