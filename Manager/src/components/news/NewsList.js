import { useNavigate } from 'react-router-dom';
import MaterialTable, { MTableToolbar } from '@material-table/core';
import { Alert, Button, Stack, Tooltip, Typography } from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useConfirm } from 'material-ui-confirm';

// slices
import { deleteMultipleNews, deleteNews } from '../../redux/slices/news';
// path
import { PATH_DASHBOARD } from '../../routes/path';
// utils
import { fDate } from '../../utils/formatDate';


const columns = [
    {
        field: 'title',
        title: 'Tiêu đề',
        width: '50%'
    },
    {
        field: 'image',
        title: 'Hình ảnh',
        render: row => (
            <Tooltip
                disableFocusListener
                placement='left'
                title={<img src={`${process.env.REACT_APP_IMAGE_URL}/${row.image}`} alt={row.title} />}
            >
                <img
                    src={`${process.env.REACT_APP_IMAGE_URL}/${row.image}`}
                    alt={row.title}
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
        emptyDataSourceMessage: 'Chưa có tin tức nào để hiện thị'
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

const NewsList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const confirm = useConfirm();
    const { news } = useSelector(state => state.news);
    const handleDelete = async _newsId => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn xóa tin tức này?',
                content: <Alert severity='error'>Tin tức sau khi xóa sẽ được lưu vào thùng rác!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            dispatch(deleteNews(_newsId));
        } catch (error) {

        }
    };
    const handleDeleteAll = async deleteItems => {
        try {
            await confirm({
                title: 'Bạn có chắc muốn xóa tất cả tin tức được chọn?',
                content: <Alert severity='error'>Tin tức sau khi xóa sẽ được lưu vào thùng rác!</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const deleteIds = deleteItems.map(item => item._id);
            dispatch(deleteMultipleNews(deleteIds));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {news && (
                <MaterialTable
                    title='Tất cả tin tức'
                    columns={columns}
                    data={news}
                    options={options}
                    localization={localization}
                    actions={[
                        {
                            icon: () => <Edit color='warning' />,
                            tooltip: 'Xem và Sửa',
                            onClick: (event, row) => navigate(`${PATH_DASHBOARD.news.edit}/${row.slug}`),
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
                                        onClick={() => navigate(PATH_DASHBOARD.news.create)}
                                    >
                                        Thêm mới
                                    </Button>
                                </Stack>
                            </div>
                        )
                    }}
                />
            )}
            {!news && 'Loading...'}
        </>
    );
};

export default NewsList;
