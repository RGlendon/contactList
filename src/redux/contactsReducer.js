const ADD_CONTACT = 'ADD_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
const REWRITE_STATE = 'REWRITE_STATE';
const SEARCH = 'SEARCH';
const UPDATE_CONTACT_INFO = 'UPDATE_CONTACT_INFO';

const initialState = {
    contacts: [
        {
            name: "Ольга Игоревна",
            phoneNumber: "+79151233232",
            email: "olga-igorevna@gmail.com",
            avatar: "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
            _id: "dbfe53c3c4d568240378b0c6"
        },
        {
            name: "Даша Печкина",
            phoneNumber: "+79191236534",
            email: "dasha@yandex.com",
            avatar: "https://www.imaginar.co.uk/wp-content/uploads/2016/12/girl-face-front.jpg",
            _id: "d285e3dceed844f902650f40"
        },
        {
            name: "Маша Сокол",
            phoneNumber: "+79168372684",
            email: "mariyafalcon@gmail.com",
            avatar: "https://media.gettyimages.com/photos/hayden-panettiere-at-the-i-love-you-beth-cooper-press-conference-at-picture-id112568938",
            _id: "7d8c010a1c97ca2654997a95"
        },
        {
            name: "Пётр Фо",
            phoneNumber: "89157263232",
            email: "whatsup@gmail.com",
            avatar: "https://avatars.mds.yandex.net/get-pdb/1074676/5aff8976-0c0c-4cde-9902-bfeec72d85de/s1200?webp=false",
            _id: "f20c9c560aa652a72cba323f"
        },
        {
            name: "Виктор Федоров",
            phoneNumber: "+79151135332",
            email: "goriding@gmail.com",
            avatar: "https://yt3.ggpht.com/a/AATXAJxWl2OpFByJlh-WG-7rmoj3v8Rugm_kOfRgYQ=s900-c-k-c0xffffffff-no-rj-mo",
            _id: "8340d0ec33270a25f2413b69"
        },
        {
            name: "Владимир",
            phoneNumber: "+79151234385",
            email: "vlus@gmail.com",
            avatar: "http://f4.mylove.ru/CVXxkLkCtv.png",
            _id: "3c8c16ee9b1f89a2f8b5e4b2"
        },
        {
            name: "Просто Петя",
            phoneNumber: "+79151239282",
            email: "petya@gmail.com",
            avatar: "https://cdn1.flamp.ru/afc38f1ae0ca55d81f11fc44012629a5.jpg",
            _id: "f20c9c560aa652a72cba323a"
        },
        {
            name: "Гриша Лось",
            phoneNumber: "89124853232",
            email: "grishka@gmail.com",
            avatar: "https://i09.fotocdn.net/s119/2ba0a60d5886b85f/user_l/2716065481.jpg",
            _id: "8340d0ec33270a25f2413b29"
        },
        {
            name: "Витя Мотор",
            phoneNumber: "+79155624232",
            email: "engine@gmail.com",
            avatar: "https://i01.fotocdn.net/s120/62b4a8e575bb54d4/user_l/2751280406.jpg",
            _id: "3c8c16ee9b1f89a2f8b5e4b1"
        }
    ],
};

function contactsReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.contact, ...state.contacts]
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(({_id}) => _id !== action.contactId)
            };
        case REWRITE_STATE:
            initialState.contacts = state.contacts;
            return state;
        case SEARCH:
            return {
                ...state,
                contacts: [...initialState.contacts].filter(({ name, phoneNumber, email }) => {
                    const regExp = new RegExp(`${action.searchValue}`, 'ig');
                    return regExp.test(name) || regExp.test(phoneNumber) || regExp.test(email);
                })
            };
        case UPDATE_CONTACT_INFO:
            return {
                ...state,
                contacts: state.contacts.map((contact) => {
                    if (contact._id === action.allInfo._id) {
                        return action.allInfo;
                    }
                    return contact
                })
            };
        default:
            return state;
    }
}


export default contactsReducer;


export const addContact = (contact) => ({type: ADD_CONTACT, contact});
export const deleteContact = (contactId) => ({type: DELETE_CONTACT, contactId});
export const rewritingInitialState = () => ({type: REWRITE_STATE});
export const searchContact = (searchValue) => ({type: SEARCH, searchValue});
export const updateContactInfo = (allInfo) => ({type: UPDATE_CONTACT_INFO, allInfo});
