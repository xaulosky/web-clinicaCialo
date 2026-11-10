const fs = require('fs');
const filePath = 'd:/PAGINAS WEB/web-cialo/data/tratamientos.ts';
let content = fs.readFileSync(filePath, 'utf8');

const targetIds = [
    'cool-peel',
    'toxina-tercio-superior',
    'toxina-bruxismo',
    'toxina-full-face',
    'rinomodelacion',
    'labios-ah',
    'sculptra',
    'radiesse',
    'ellanse',
    'morpheus8-facial'
];

for (const id of targetIds) {
    const idRegex = new RegExp(`(id:\\s*"${id}"[\\s\\S]+?descripcion:\\s*")([^"]+)("[\\s\\S]+?)(profesional:\\s*"[^"]*Dr\\.\\s*Nicolás\\s*Laucirica[^"]*",)`, '');

    content = content.replace(idRegex, (match, p1, p2, p3, p4) => {
        const appendedDesc = p2 + " Valor Evaluación: $30.000 (Si se realiza el tratamiento, este valor se descuenta del costo total).";
        const agendaStr = `agendaUrl: "https://agendamiento.reservo.cl/makereserva/agenda/80br1yU0X03NjJ7R6k95ll55U6m99N",`;
        return p1 + appendedDesc + p3 + p4 + '\n        ' + agendaStr;
    });
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Update complete.');
