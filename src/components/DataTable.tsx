import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { User } from "../redux/model/User";
import { Link } from "react-router-dom";
import { unblockUser, blockUser } from "../redux/slices/userSlice";
type DataTableProps = {
  users: Array<User>;
};

export const DataTable: React.FC<DataTableProps> = ({ users }) => {
  const dispatch = useDispatch();

  const handleUnblockClick = (userId: string) => {
    dispatch(unblockUser(userId));
  };
  const handleBlockClick = (userId: string) => {
    dispatch(blockUser(userId));
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "username", headerName: "Username", width: 150 },
    { field: "age", headerName: "Age", width: 150 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 150 },
    {
      field: "Ver mas",
      headerName: "Ver mas",
      width: 120,
      renderCell: (params) => {
        return (
          <Link to={`/user/${params.id}`}>
            <b>Ver mas</b>
          </Link>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      width: 130,
      maxWidth: 130,
      renderCell: (params) => (
        <div>
          {params.row.blocked ? (
            <button
              className="unblock-button"
              onClick={() => handleUnblockClick(params.id.toString())}
            >
              Unblock
            </button>
          ) : (
            <button
              className="block-button"
              onClick={() => handleBlockClick(params.id.toString())}
            >
              Block
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="data-box">
      <DataGrid
        rows={users}
        columns={columns}
        autoPageSize
        disableRowSelectionOnClick
      />
    </div>
  );
};
