import MaterialTable, { MTableToolbar } from '@material-table/core';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// slices
import { deleteArchitect, deleteArchitects } from '../../redux/slices/architect';
// path
import { PATH_DASHBOARD } from '../../routes/path';
// utils
import { fDate } from '../../utils/formatDate';


const columns = [
    {
        field: 'name',
        title: 'Kiến trúc sư',
        width: '50%',
        render: row => (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                <Box
                    component='img'
                    alt={row.name}
                    src={`${process.env.REACT_APP_IMAGE_URL}/${row.image}`}
                    sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%'
                    }}
                />
                <Typography variant='subtitle2'>{row.name}</Typography>
            </Stack>
        )
    },
    {
        field: 'createdAt',
        title: 'Ngày tạo',
        width: '30%',
        render: row => (
            <Typography variant='body2'>{fDate(row.createdAt)}</Typography>
        )
    }
];

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1,
    tableLayout: 'fixed'
};

const localization = {
    toolbar: {
        nRowsSelected: '{0} dòng được chọn',
        searchPlaceholder: 'Tìm kiếm',
        searchTooltip: 'Tìm kiếm'
    },
    header: {
        actions: 'Hành động'
    },
    body: {
        emptyDataSourceMessage: 'Chưa có kiến trúc sư nào để hiện thị'
    },
    pagination: {
        labelRowsPerPage: 'Số dòng mỗi trang',
        labelRowsSelect: 'dòng',
        labelDisplayedRows: '{from}-{to} của {count}',
        firstTooltip: 'Trang đầu',
        previousTooltip: 'Trang trước',
        nextTooltip: 'Trang tiếp',
        lastTooltip: 'Trang cuối'
    }
};

const ArchitectorList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const { architects } = useSelector(state => state.architect);
    const handleDelete = async _architectId => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn xóa kiến trúc sư này?',
                content: <Alert severity='error'>Kiến trúc sư sau khi xóa sẽ được lưu vào thùng rác!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            dispatch(deleteArchitect(_architectId));
        } catch (error) {

        }
    };
    const handleDeleteAll = async deleteItems => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn xóa tất cả kiến trúc sư được chọn?',
                content: <Alert severity='error'>Kiến trúc sư sau khi xóa sẽ được lưu vào thùng rác!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const deleteIds = deleteItems.map(item => item._id);
            dispatch(deleteArchitects(deleteIds));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {architects && (
                <MaterialTable
                    title='Kiến trúc sư'
                    columns={columns}
                    data={architects}
                    options={options}
                    localization={localization}
                    actions={[
                        {
                            icon: () => <Edit color='warning' />,
                            tooltip: 'Xem và Sửa',
                            onClick: (event, row) => navigate(`${PATH_DASHBOARD.architect.edit}/${row._id}`),
                            position: 'row'
                        },
                        {
                            icon: () => <Delete color='error' />,
                            tooltip: 'Xóa',
                            onClick: (event, row) => handleDelete(row._id),
                            position: 'row'
                        },
                        {
                            icon: () => <Delete color='error' />,
                            tooltip: 'Xóa tất cả',
                            onClick: (evt, rows) => handleDeleteAll(rows)
                        }
                    ]}
                    components={{
                        Toolbar: props => (
                            <div>
                                <MTableToolbar {...props} />
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing={1}
                                    sx={{ px: 3, mb: 1 }}
                                >
                                    <Button
                                        variant='contained'
                                        color='success'
                                        startIcon={<AddCircle />}
                                        onClick={() => navigate(PATH_DASHBOARD.architect.create)}
                                    >
                                        Thêm mới
                                    </Button>
                                </Stack>
                            </div>
                        )
                    }}
                />
            )}
            {!architects && 'Loading...'}
        </>
    );
};

export default ArchitectorList;
