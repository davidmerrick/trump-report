import keyMirror from 'keymirror'

const ClassifierState = keyMirror({
    NOT_SUBMITTED: null,
    SUBMITTED: null,
    SUBMIT_FAILED: null
});

export default ClassifierState