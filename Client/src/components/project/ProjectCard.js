import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from '@mui/material';
import PropTypes from 'prop-types';


export default function ProjectCard({ project }) {
  return (
    <Card sx={{
      height: {xs:'auto', sm: '25vh'},
      maxWidth: '100%',
      borderRadius: 0,
      boxShadow: 'none',
      filter: 'grayscale(1)',
      transition: 'filter 0.3s',
      ':hover': {
        filter: 'grayscale(0)',
      }
    }}>
      <Link href={`/projects/${project.slug}`}>
        <CardMedia sx={{
          height: {xs:'35vh', sm: '19vh'},
        }}
          component="img"
          alt={project.name}
          image={`${process.env.REACT_APP_IMAGE_URL}/${project.images[0]}`}
        />
      </Link>
      <CardContent sx={{ padding: "4px 0" }}>
        <CardActions sx={{ padding: "0" }}>
          <Link href={`/projects/${project.slug}`} sx={{
            color: '#000000',
            textDecoration: 'none',
            textTransform: 'uppercase',
            //paddingBottom:'10px',
            fontWeight: '300',
            fontSize: '12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '16px',
            maxWidth:'100%',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '2',
            ":hover": {
              color: '#6D6D6D'
            }
            
          }}>{project.name}</Link>
        </CardActions>
         {/* <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: '10px',
            display: {xs: 'none', xl: '-webkit-box'},
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
            overflow: 'hidden',
            textAlign: 'justify',
            textJustify: 'distribute',
            wordWrap: 'break-word',
          }}>
          <div dangerouslySetInnerHTML={{ __html: `${project.description}` }}></div>
        </Typography>  */}
      </CardContent>
    </Card>
  );
}

ProjectCard.propTypes = {
  Project: PropTypes.array.isRequired
};
