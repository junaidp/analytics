// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography';
// import { mdiTextBoxMultipleOutline } from '@mdi/js';
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderRestrictions = (
  { onChange,
    files, handleRemoveAllFiles, accept, iconType, handleRemoveFile, maxFiles }) => {
  // ** State
  //  const [files, setFiles] = useState<File[]>([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFiles,
    maxSize: 15000000,
    accept: {
      'image/*': accept
    },
    onDrop: (acceptedFiles) => {
      // setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
      onChange(acceptedFiles.map((file) =>
        Object.assign(file)
      ))
    },
    onDropRejected: () => {
      toast.error('You can only upload 2 files & maximum size of 2 MB.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file) => {
    console.log("file", file)
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveSingleFile = (file) => {
    handleRemoveFile(file);
  }

  const fileList = files.map((file) => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveSingleFile(file)}>
        <Close fontSize='small' />
      </IconButton>
    </ListItem>
  ))

  const handleRemoveAll = () => {
    handleRemoveAllFiles();
  }

  return (
    <Fragment>
      <Grid container spacing={5} {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>

          {
            iconType === "button" ? <Button variant='contained'>Upload</Button> :
              <>
                <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                  <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                  <Typography color='textSecondary'>Allowed *{accept.toString().replace(",.", " *.")}</Typography>
                  {maxFiles === 2 && <Typography color='textSecondary'>Max 2 files and max size of 2 MB</Typography>
                  }
                </Box>
              </>
          }

        </Box>
      </Grid>

      {files.length ? (
        <Grid>
          <Fragment>
            <List>{fileList}</List>
            <div className='buttons'>
              <Button color='error' variant='outlined' onClick={handleRemoveAll}>
                Remove
              </Button>
              {/* <Button variant='contained' onClick={onHandleUpload}>
              Upload Files
            </Button> */}
            </div>
          </Fragment>
        </Grid>
      ) : null}


    </Fragment>
  )
}

export default FileUploaderRestrictions
