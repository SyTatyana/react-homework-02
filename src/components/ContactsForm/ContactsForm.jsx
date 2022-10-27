import React from 'react';
import styles from './styles.module.css';
import shortid from 'shortid';

export class ContactsForm extends React.Component {
  state = {
    name: '',
    number: '',
    isDisabled: false,
  };

  onInputChange = e => {
    let { name, value } = e.currentTarget;
    this.setState({ isDisabled: false });
    this.setState({ [name]: value });
    let finder = this.props.contacts.find(
      contact =>
        contact.name.toLowerCase() === value.toLowerCase() ||
        contact.number === value
    );
    if (finder) {
      this.setState({ isDisabled: true });
      alert(`${value} is already in contacts.`);
      this.setState({ [name]: '' });
    }
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: this.state.name,
      number: this.state.number,
    };

    this.props.addContact(contact);
    this.resetForm();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
            onChange={e => this.onInputChange(e)}
          />
        </label>
        <label>
          Number:
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={this.state.number}
            onChange={e => this.onInputChange(e)}
          />
        </label>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={this.state.isDisabled}
        >
          add contact
        </button>
      </form>
    );
  }
}