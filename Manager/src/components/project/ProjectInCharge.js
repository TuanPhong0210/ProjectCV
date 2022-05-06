import PropTypes from 'prop-types';
import { Stack, Autocomplete, TextField, Chip, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

const propTypes = {
    architectId: PropTypes.string,
    handleSelect: PropTypes.func.isRequired
};

const ProjectInCharge = ({ architectId, handleSelect }) => {
    const { architects } = useSelector(state => state.architect);
    const selectedArchitect = architects.find(_architect => _architect._id === architectId);
    return (
        <Stack
            direction='row'
            alignItems='center'
            spacing={2}
        >
            {selectedArchitect && (
                <Chip
                    avatar={<Avatar alt={selectedArchitect.name} src={`${process.env.REACT_APP_IMAGE_URL}/${selectedArchitect.image}`} />}
                    label={selectedArchitect.name}
                    variant='outlined'
                />
            )}
            <Autocomplete
                options={architects}
                getOptionLabel={option => option.name}
                fullWidth
                renderInput={params => (
                    <TextField
                        {...params}
                        label='Tên kiến trúc sư'
                        variant='standard'
                    />
                )}
                onChange={(e, value) => handleSelect(value)}
            />
        </Stack>
    );
};

ProjectInCharge.propTypes = propTypes;

export default ProjectInCharge;
