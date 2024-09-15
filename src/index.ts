const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();

// Pipe the PDF document to a writable stream (file)
doc.pipe(fs.createWriteStream('complex_layout.pdf'));

// Set fonts and styles
doc.font('Helvetica-Bold').fontSize(14);

// Add "PAGO MINIMO" section
doc.text('PAGO MINIMO', { continued: true }).fontSize(10).text('En pesos', { align: 'right', width: 200 });
doc.moveDown();
doc.fontSize(20).text('$ 22.560,00', { align: 'left' });

// Add "LIMITES" section
doc.font('Helvetica-Bold').fontSize(14).text('LÍMITES', 250, 40);
doc.fontSize(10).text('De compras en un pago y en cuotas', { align: 'left', continued: true });
doc.fontSize(20).text('$ 2.300.000,00', { align: 'right', width: 200 });

// Add the "TASAS" section
doc.rect(30, 120, 550, 30).fill('#f0f0f0').stroke();
doc.fillColor('black').fontSize(12).text('TASAS', 35, 127);
doc.fontSize(10).text('Nominal Anual', 250, 127);
doc.text('Efectiva mensual', 400, 127);
doc.fontSize(12).text('En pesos 81,000%', 250, 147);
doc.text('En dólares 0,000%', 400, 147);
doc.text('En pesos 6,672%', 250, 167);
doc.text('En dólares 0,000%', 400, 167);

// Add table headers
doc.fontSize(12).text('CONSOLIDADO', 30, 200);
doc.fontSize(10).text('SALDO ANTERIOR', 30, 220);
doc.text('PESOS', 400, 220);
doc.text('DÓLARES', 500, 220);

// Add rows of data
let startY = 240;
const rowHeight = 20;
const data = [
  ['07-Ago-24', 'SU PAGO U$S', '', '0,00', '10,11'],
  ['07-Ago-24', 'SU PAGO', '', '0,00', '-10,11'],
  ['', 'SALDO PENDIENTE', '', '-296.958,37', '-296.958,37'],
  ['', 'TOTAL CONSUMOS DEL MES', '', '127.126,10', '9,90'],
];

data.forEach((row) => {
  doc.text(row[0], 30, startY);
  doc.text(row[1], 100, startY);
  doc.text(row[3], 400, startY, { width: 80, align: 'right' });
  doc.text(row[4], 500, startY, { width: 80, align: 'right' });
  startY += rowHeight;
});

// Add subtotal
doc.font('Helvetica-Bold').text('SUBTOTAL', 30, startY);
doc.text('127.126,10', 400, startY, { width: 80, align: 'right' });
doc.text('9,90', 500, startY, { width: 80, align: 'right' });

// Add additional fees
doc.font('Helvetica').fontSize(10);
startY += rowHeight;
const fees = [
  ['PERCEPCION IVA DTO 354/18', '1.974,01', ''],
  ['IMPUESTO PAIS AR', '752,00', ''],
  ['PERCEP. AFIP RG 4815 30%', '2.820,01', ''],
  ['PERC IIBB SERV DIG CABA', '188,00', ''],
];

fees.forEach((fee) => {
  doc.text(fee[0], 30, startY);
  doc.text(fee[1], 400, startY, { width: 80, align: 'right' });
  startY += rowHeight;
});

// Finalize the document
doc.end();

