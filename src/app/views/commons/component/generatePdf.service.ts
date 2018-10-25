//
// import * as jspdf from 'jspdf';
//
// import html2canvas from 'html2canvas';
// import {Component} from "@angular/core";
//
// @Component({
//     selector: 'app-htmltopdf',
//     templateUrl: './bautismo_template.html',
// })
// export class GeneratePdf {
//
//     public captureScreen()
//     {
//         let data = document.getElementById('contentToConvert');
//         // @ts-ignore
//         html2canvas(data).then(canvas => {
//             // Few necessary setting options
//             let imgWidth = 208;
//             // @ts-ignore
//             let pageHeight = 295;
//             let imgHeight = canvas.height * imgWidth / canvas.width;
//             // @ts-ignore
//             let heightLeft = imgHeight;
//
//             const contentDataURL = canvas.toDataURL('image/png');
//             let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
//             let position = 0;
//             pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
//             pdf.save('MYPdf.pdf'); // Generated PDF
//         });
//     }
//
// }