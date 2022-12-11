# Blockify Blocks

Blockify Blocks is a lightweight and experimental block library for WordPress. It includes a collection of custom blocks
that can be used to enhance the functionality and design of your WordPress site.

The blocks provided by this plugin are only intended to be used as examples for developers to learn from. These blocks
are not intended for use in production environments, and are provided for development and learning purposes only.

The blocks included in the plugin are fully functional and can be customized and used to build WordPress sites, but they
are not guaranteed to be stable or reliable in a production setting. Instead, they are intended to be used as a learning
resource for developers who are interested in learning about WordPress blocks and TypeScript.

By providing these blocks as examples, we hope to make it easier for developers to learn about WordPress blocks, and to
provide a starting point for building their own custom blocks.

## Blocks

- **Accordion**: This block allows you to create collapsible sections of content, similar to an accordion menu.
- **Breadcrumbs**: This block allows you to display a hierarchy of links, typically used to show the current page's location within a site.
- **Counter**: This block allows you to display a number that can be incremented or decremented by the user.
- **Form**: This block allows you to create and customize forms, including input fields, text areas, and buttons.
- **Google Map**: This block allows you to embed a Google Map on your WordPress site, with customizable options for the map's location and appearance.
- **Icon**: This block allows you to insert an icon from a pre-defined set of icons, such as Font Awesome or Material Design icons.
- **Slider**: This block allows you to create a slideshow of images or other content, with customizable transitions and navigation controls.
- **Tabs**: This block allows you to create a tabbed interface, with separate panels of content that can be shown or hidden by clicking on the corresponding tab.

## Features

- 100% TypeScript
- Fully functional blocks
- Webpack build process
- WordPress coding standards

## Installation

To install Blockify Blocks, follow these steps:

1.Clone the repository from GitHub using the following command: git clone https://github.com/blockify/blocks.git
2. In your WordPress admin dashboard, go to Plugins > Add New.
3. Click on the Upload Plugin button, and select the plugin zip file you downloaded from GitHub.
4. Click on Install Now, and then activate the plugin.

## Usage

To get started using the blocks provided by the Blockify Blocks plugin without opening WordPress, you will need to do the following:

1. Clone the repository from GitHub using the following command: git clone https://github.com/blockify/blocks.git
Open the blocks directory in your favorite code editor.
2. In the src/blocks directory, you will find the individual block files. Each block file contains the TSX code for that block, as well as any associated styles and scripts.
3. You can use these files as a starting point for building your own custom blocks. You can modify the code to change the behavior and appearance of the blocks, and test your changes by running the npm start command in the plugin root directory. This will start a development server that will allow you to preview your changes in real time.
4. When you are satisfied with your changes, you can build the plugin by running the npm run build command in the plugin root directory. This will create a production-ready version of the blocks in the build directory, which you can then use in WordPress.

Overall, the process for getting started with development using the blocks provided by the Blockify Blocks plugin is relatively simple and straightforward, and can be easily learned by anyone with a basic understanding of WordPress and TSX.

## Development

To get started developing with the Blockify Blocks plugin, you will need to do the following:

1. Clone the repository from GitHub using the following command: git clone
2. Open the blocks directory in your favorite code editor.
3. Run the npm install command in the plugin root directory. This will install all of the dependencies required to build the plugin.
4. Run the npm build command in the plugin root directory. This will create a production-ready version of the blocks in the build directory, which you can then use in WordPress.

## Frequently Asked Questions

### Why TypeScript?

TypeScript is a superset of JavaScript that adds static typing to the language. This makes it easier to write code that is more reliable and easier to maintain. It also makes it easier to write code that is more readable and easier to understand.

### Why Webpack?

Webpack is a module bundler that allows you to bundle all of the files required for your plugin into a single file. This makes it easier to manage and maintain your code, and it also makes it easier to optimize your code for production.

This is what @wordpress/scripts uses behind the scenes. It provides a set of scripts that you can use to build your plugin, and it also provides a set of scripts that you can use to run your plugin in development mode.

### What are TSX files?

TSX, which stands for TypeScript JSX, is a variant of the JSX syntax used in React applications. It provides a number of benefits over using regular JSX, including the following:

1. Stronger type checking: TSX allows for stronger type checking than regular JSX, which can help to catch errors and bugs before they become a problem. This can make it easier to develop large and complex React applications, and can help to prevent runtime errors.
2. Better tooling support: Many popular code editors and IDEs, such as Visual Studio Code and WebStorm, provide better tooling support for TSX than for regular JSX. This can make it easier to develop and debug React applications using TSX, and can improve the overall development experience.
3. Improved readability and maintainability: Because TSX allows for stronger type checking and better tooling support, it can make React code more readable and maintainable. This can be especially useful for teams working on large and complex projects, and can make it easier to onboard new developers and maintain existing code.
4. Overall, TSX can provide a number of benefits over regular JSX, and is worth considering if you are developing React applications and want to take advantage of the improved type checking and tooling support it provides.

## Support

Please use the GitHub issue tracker to report any bugs or file feature requests. Pull requests are also welcome. If you have any questions, feel free to contact us at https://blockifywp.com/support/
