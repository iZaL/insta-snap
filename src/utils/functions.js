export function getExtension($filename) {
  return $filename.substring($filename.lastIndexOf(".")+1);
}

export function getMediaName($filename) {
  return $filename.substring($filename.lastIndexOf("/")+1);
}