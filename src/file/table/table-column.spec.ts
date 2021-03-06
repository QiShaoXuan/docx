import { expect } from "chai";

import { Formatter } from "export/formatter";

import { TableCell } from "./table-cell";
import { TableColumn } from "./table-column";

describe("TableColumn", () => {
    let cells: TableCell[];
    beforeEach(() => {
        cells = [new TableCell(), new TableCell(), new TableCell()];
    });

    describe("#getCell", () => {
        it("should get the correct cell", () => {
            const tableColumn = new TableColumn(cells);
            const cell = tableColumn.getCell(0);

            expect(cell).to.deep.equal(cells[0]);

            const cell2 = tableColumn.getCell(1);

            expect(cell2).to.deep.equal(cells[1]);
        });

        it("should throw an error if index is out of bounds", () => {
            const tableColumn = new TableColumn(cells);

            expect(() => tableColumn.getCell(9)).to.throw();
        });
    });

    describe("#mergeCells", () => {
        it("should add vMerge to correct cells", () => {
            const tableColumn = new TableColumn(cells);
            tableColumn.mergeCells(0, 2);

            const tree = new Formatter().format(cells[0]);
            expect(tree).to.deep.equal({
                "w:tc": [{ "w:tcPr": [{ "w:vMerge": [{ _attr: { "w:val": "restart" } }] }] }, { "w:p": [{ "w:pPr": [] }] }],
            });

            const tree2 = new Formatter().format(cells[1]);
            expect(tree2).to.deep.equal({ "w:tc": [{ "w:tcPr": [] }, { "w:p": [{ "w:pPr": [] }] }] });

            const tree3 = new Formatter().format(cells[2]);
            expect(tree3).to.deep.equal({
                "w:tc": [{ "w:tcPr": [{ "w:vMerge": [{ _attr: { "w:val": "continue" } }] }] }, { "w:p": [{ "w:pPr": [] }] }],
            });
        });
    });
});
