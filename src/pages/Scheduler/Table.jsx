import React, { useCallback, useMemo, useState } from "react";
import { DataGrid, GridActionsCellItem, GridDeleteIcon } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Button, Stack, Typography } from "@mui/material";
import { deleteSchedule } from "../../api/call/scheduler";
// When using TypeScript 4.x and above

const TableComponent = ({ data, onClickEdit, refetch }) => {
   const handleDelete = async (id) => {
      if (window.confirm("Yakin ingin menghapus schedule?")) {
         try {
            await deleteSchedule(id);
            refetch();
            alert("Sukses hapus schedule");
         } catch (error) {
            console.log(error);
         }
      } else {
      }
   };

   const columns = [
      {
         field: "id",
         headerName: "ID",
         width: 80,
      },
      {
         field: "nama",
         headerName: "Nama",
         width: 100,
      },
      {
         field: "template",
         headerName: "Template",
         flex: 1,
      },
      {
         field: "waktu_kirim",
         headerName: "Berjalan Setiap",
         flex: 1,
      },
      {
         field: "jam_kirim",
         headerName: "Jam Kirim",
         flex: 1,
      },
      {
         field: "masa_aktif",
         headerName: "Aktif Sampai",
         flex: 1,
      },
      {
         field: "status",
         headerName: "Status",
         flex: 1,
         valueGetter: (params) => (params.row.status === 1 ? "Aktif" : "Nonaktif"),
      },
      {
         field: "last_run",
         headerName: "Terakhir BC",
         flex: 1,
         valueGetter: (params) => (params.row.last_run !== null ? params.row.last_run : "-"),
      },
      {
         headerName: "Action",
         flex: 1,
         disableClickEventBubbling: true,

         renderCell: (params) => {
            const currentRow = params.row;

            return (
               <Stack direction="row" spacing={2}>
                  <Button variant="outlined" color="warning" size="small" onClick={() => onClickEdit(currentRow)}>
                     <FaEdit />
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(currentRow.id)}>
                     <AiOutlineDelete />
                  </Button>
               </Stack>
            );
         },
      },
   ];

   return <>{data.length > 0 ? <DataGrid rows={data} columns={columns} /> : <Typography>Belum ada penjadwalan yang dibuat</Typography>}</>;
};

export default TableComponent;
