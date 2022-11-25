import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default function useImage() {

    function saveImage(elementId, name, extension = 'png') {
        const element = document.getElementById(elementId);
        html2canvas(element).then((canvas) => {
            canvas.toBlob((blob) => {
                saveAs(blob, `${name}.${extension}`);
            })
        })
    }

    return {
        saveImage
    }
}