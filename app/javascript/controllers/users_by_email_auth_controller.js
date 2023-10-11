import { Controller } from '@hotwired/stimulus';
import axios from 'axios';

// Create a custom Axios instance
const customAxios = axios.create({
  baseURL: '/', // Assuming your API is on the same domain
  // Add any other default configurations if needed
});

export default class extends Controller {
  static targets = ['email', 'submit'];

  connect() {
    console.log('axios: ', customAxios);
    this.submitTarget.addEventListener('click', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const emailValue = this.emailTarget.value;

    if (emailValue.length === 0) {
      // email field is empty, so don't submit the form
      console.warn("Email field is empty. Please enter an email.");
      return;
    }

    try {
      await customAxios.get('/users_by_email', {
        params: {
          email: emailValue
        }
      });
      Turbo.visit('/users/sign_in');
    } catch (error) {
      Turbo.visit('/users/sign_up');
    }
  }
}
