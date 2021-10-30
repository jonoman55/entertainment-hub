import { InputAdornment, IconButton } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

const ClearIcon = ({ onClick }) => (
    <InputAdornment position='end'>
        <IconButton
            size='small'
            aria-label='clear'
            onClick={onClick}
            edge='end'
        >
            <Clear fontSize='medium' />
        </IconButton>
    </InputAdornment>
);

export default ClearIcon;