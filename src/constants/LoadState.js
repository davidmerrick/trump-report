import keyMirror from 'keymirror'

const LoadState = keyMirror({
    LOADING: null,
    READY: null,
    ERROR: null
});

export default LoadState