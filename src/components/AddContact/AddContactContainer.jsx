import {connect} from "react-redux";
import {addContact} from "../../redux/contactsReducer";
import AddContact from "./AddContact";


const mapDispatchToProps = {
    addContact,
};

export default connect(null, mapDispatchToProps)(AddContact);
