class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;

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
        // Execute the rendering logic defined below
        this.attach();
    }
    // Rendering logic
    private attach() {
        // Here, we're appending the imported node to the host element immediately after the opening tag of hostElement
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const projInput = new ProjectInput();
