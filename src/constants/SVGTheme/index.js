/** @format */

import { BREAKPOINTS } from "./ComponentStyles";
import SVGFiles from "./SVGRegister";

export const SGV_REGISTER = {
  icons: {
    "not-found-image": SVGFiles.notFound,
    "plus-svg": SVGFiles.plus,
    "folder-svg": SVGFiles.folder,
    "more-svg": SVGFiles.more,
    "upload-file-svg": SVGFiles.uploadFile,
    "doc-svg": SVGFiles.doc,
    "close-svg": SVGFiles.close,
    "pic-svg": SVGFiles.pic,
    "mp3-svg": SVGFiles.mp3,
    "mov-svg": SVGFiles.mov,
    "chevron-right-svg": SVGFiles.chevronRight,
    "error-toast-svg": SVGFiles.errorToast,
    "success-toast-svg": SVGFiles.successToast,
  },
};

export const BREAKPOINTS_RESPONSIVE = { ...BREAKPOINTS };
