import moment from "moment";
import * as XLSX from "xlsx";


export const commonUtils = {
    convertJsonToCsvOrExcel: ({ jsonArray, csvColumns, fileName, extension, setSelectedRowIds }) => {
        const date = new Date();
        const formatedDate = moment(date).format("DD-MM-YYYY")
        const csvHeader = csvColumns?.map((col) => col?.Header);

        const csvContent = [
            csvHeader,
            ...jsonArray?.map((row) => csvColumns?.map((col) => row[col?.accessor]))
        ];

        const ws = XLSX.utils.aoa_to_sheet(csvContent);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, `${fileName}_${(formatedDate)}.${extension}`);    // .csv, .xlsx
        if (setSelectedRowIds) setSelectedRowIds([])
    },
    downloadCsvOrExcel: ({ csvColumns, data, extension, fileName, selectedIds, setSelectedRowIds }) => {
        const formatDateOfBirth = (dateString) => {
            return moment(dateString).format('DD/MM/YYYY HH:MM A')
        };

        const formatRecords = (records) => {
            return records.map((rec) => {
                const selectedFieldsData = {};
                csvColumns?.forEach((item) => {
                    if (item?.type === 'date') {
                        selectedFieldsData[item?.accessor] = formatDateOfBirth(rec[item?.accessor]);
                    }
                    else {
                        selectedFieldsData[item?.accessor] = rec[item?.accessor];
                    }
                });
                return selectedFieldsData;
            });
        };

        if (selectedIds && selectedIds?.length > 0) {
            const selectedRecordsWithSpecificFileds = formatRecords(data?.filter((rec) => selectedIds?.includes(rec._id)));
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: selectedRecordsWithSpecificFileds, csvColumns, fileName, extension, setSelectedRowIds });
        } else {
            const AllRecordsWithSpecificFileds = formatRecords(data);
            commonUtils.convertJsonToCsvOrExcel({ jsonArray: AllRecordsWithSpecificFileds, csvColumns, fileName, extension, setSelectedRowIds });
        }
    }
}