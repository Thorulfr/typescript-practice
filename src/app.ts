// Autobind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}

// Project Input class
class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        // References the template element already defined in index.html
        this.templateElement = document.getElementById(
            'project-input'
        )! as HTMLTemplateElement;
        // References where I want to render the element
        this.hostElement = document.getElementById('app')! as HTMLDivElement;

        // Store the content of the template element using .importNode(); .content gets the actual content of the template element, and the second argument is a boolean that determines whether or not to copy the descendent content of the template element or just the template element itself
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        // Store the imported node in a globally accessible variable so we can access it in our rendering logic below
        this.element = importedNode.firstElementChild as HTMLFormElement;
        // Add an ID to the rendered element (in this case, so we can add styling to it)
        this.element.id = 'user-input';

        // Store references to the input elements
        this.titleInputElement = this.element.querySelector(
            '#title'
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            '#description'
        ) as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            '#people'
        ) as HTMLInputElement;

        // Execute the event listener function defined below
        this.configure();

        // Execute the rendering logic defined below
        this.attach();
    }

    // Clear input fields
    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    // Get user input values
    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        // Validate user input
        if (
            enteredTitle.trim().length === 0 ||
            enteredDescription.trim().length === 0 ||
            enteredPeople.trim().length === 0
        ) {
            alert('Invalid input, please try again!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    // Handler for the submit event
    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // Gather user input
        const userInput = this.gatherUserInput();
        // Check to see if the user input is an array (aka, the tuple we defined above)
        if (Array.isArray(userInput)) {
            // Destructure the array
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }

    // Add event listener to the form
    private configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    // Rendering logic
    private attach() {
        // Here, we're appending the imported node to the host element immediately after the opening tag of hostElement
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projInput = new ProjectInput();
