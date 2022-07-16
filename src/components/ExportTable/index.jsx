import React, { useCallback } from 'react';
import { Button } from 'antd';
import { xlsxProiver, columsAndTableDataMapSheetData } from '../../util/xlsxProvieder';

export default function ExportTable({ colums, data, fileName }) {

    const downXlsx = useCallback(() => {
        const xlsxData = [colums, data];
        const sheetDaata = columsAndTableDataMapSheetData(colums, data);

        xlsxProiver({ filename: fileName, data: sheetDaata });
    }, [colums, data, fileName,])
    return (
        <Button onClick={downXlsx}>Down :{typeof fileName === "string" ? fileName : "👇"}</Button>
    )
}