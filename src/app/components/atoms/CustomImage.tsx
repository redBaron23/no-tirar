import React from "react";
import Image, { ImageProps } from "next/image";

const customLoader = ({ src }: { src: string }) => {
  return src;
};

const CustomImage: React.FC<ImageProps> = (props) => {
  return <Image {...props} loader={customLoader} />;
};

export default CustomImage;
