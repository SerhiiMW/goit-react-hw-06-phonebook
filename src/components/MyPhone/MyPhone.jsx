import { useSelector, useDispatch } from "react-redux";

import MyPhoneForm from './MyPhoneForm/MyPhoneForm';
import MyPhoneList from './MyPhoneList/MyPhoneList';

import {addContacts, deleteContacts} from "../../redux/contacts/contacts-slice";
import {setFilter} from "../../redux/filter/filter-slice";
import { getFilteredContacts } from "../../redux/contacts/contacts-selector";


import styles from './my-phone.module.css';

const MyPhone = () => {
    const contacts = useSelector(getFilteredContacts);

    const dispatch = useDispatch();

    const isDublicate = ({ name }) => {
        const normalizedName = name.toLowerCase();

        const dublicate = contacts.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            return (normalizedCurrentName === normalizedName);
        })

        return Boolean(dublicate);
    }

    const onAddContact= (data) => {
        if (isDublicate(data)) {
            return alert(`${data.name} is already in contacts`);
        }

        const action = addContacts(data);
        dispatch(action);
    }

    const onDeleteContact = (id) => {
        dispatch(deleteContacts(id));
    }

    const changeFitler = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <MyPhoneForm className={styles.phoneForm} onSubmit={onAddContact} />
        <div className={styles.listWrapper}>
            <h1>Contacts</h1>
            <p>Find contacts by name</p>
            <input className={styles.filter} onChange={changeFitler} name="filter" placeholder="" />
            <MyPhoneList items={contacts} deleteContact={onDeleteContact} />
        </div>
    </div>
)
};

export default MyPhone;
