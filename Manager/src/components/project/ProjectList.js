import { useNavigate } from 'react-router-dom';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { Tooltip, Stack, Button, Typography, Alert } from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';

// slices
import { deleteProject, deleteProjects } from '../../redux/slices/project';
// path
import { PATH_DASHBOARD } from '../../routes/path';
// utils
import { fDate } from '../../utils/formatDate';

const columns = [
    {
        field: 'name',
        title: 'Tên dự án',
        width: '50%'
    },
    {
        field: 'image',
        title: 'Hình ảnh',
        render: row => (
            <Tooltip
                disableFocusListener
                placement='left'
                title={<img src={`${process.env.REACT_APP_IMAGE_URL}/${row.images[0]}`} alt={row.name} />}
            >
                <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/${row.images[0]}`}
                    alt={row.name}
                    style={{
                        width: '80px',
                        height: '80px'
                    }}
                />
            </Tooltip>
        )
    },
    {
        field: 'createdAt',
        title: 'Ngày tạo',
        width: '35%',
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
        emptyDataSourceMessage: 'Chưa có dự án nào để hiện thị'
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

const ProjectList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { projects } = useSelector(state => state.project);
    const handleDelete = async projectId => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn xóa dự án này?',
                content: <Alert severity='error'>Dự án sau khi xóa sẽ được lưu vào thùng rác!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            dispatch(deleteProject(projectId));
        } catch (error) {

        }
    };
    const handleDeleteAll = async deleteItems => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn xóa tất cả dự án được chọn?',
                content: <Alert severity='error'>Dự án sau khi xóa sẽ được lưu vào thùng rác!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const deleteIds = deleteItems.map(item => item._id);
            dispatch(deleteProjects(deleteIds));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <MaterialTable
            title='Tất cả dự án'
            columns={columns}
            data={projects}
            options={options}
            localization={localization}
            actions={[
                {
                    icon: () => <Edit color='warning' />,
                    tooltip: 'Xem và Sửa',
                    onClick: (event, row) => navigate(`${PATH_DASHBOARD.project.edit}/${row.slug}`),
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
                                onClick={() => navigate(PATH_DASHBOARD.project.create)}
                            >
                                Thêm mới
                            </Button>
                        </Stack>
                    </div>
                )
            }}
        />
    );
};

export default ProjectList;
