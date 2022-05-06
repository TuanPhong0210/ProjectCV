import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import Connect from './Connect';
import Contact from './Contact';
import Support from './Support';

const propTypes = {
    footer: PropTypes.array.isRequired
};

const FooterItems = ({ footer }) => {
    const { connect, contact, support } = footer.length > 0 ? footer[0] : [];
    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12} md={6}>
                <Connect connect={connect || []} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Contact contact={contact || []} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Support support={support || []} />
            </Grid>
        </Grid>
    );
};

FooterItems.propTypes = propTypes;

export default FooterItems;
