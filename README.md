<br />
<div align="center">
<img src="https://freave.cdn.freavehd.net/com/logos/fas-language-freave-green.svg" alt="Logo" height="100">

<h3 align="center">Freave make-pot</h3>

  <p align="center">
    Scan files and make a POT file for translation.
    <br />
    <br />
    <a href="https://github.com/freave/make-pot/issues">Report Bug</a>
    ·
    <a href="https://github.com/freave/make-pot/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#development">Development</a></li>
        <li><a href="#Development in a separate project">Development in a separate project</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#Credits">Credits</a></li>
  </ol>
</details>

## Getting Started

### Development
Install dependencies.<br>
`npm install`

Compile TypeScript.<br>
`npm run watch`

Allows you to run the make-pot command.<br>
`npm link`

To undo this link use<br>
`npm unlink make-pot`<br>
`npm rm --global make-pot`

Runs the command.<br>
`make-pot`

### Development in a separate project
from the root of the project run this command.<br>
`npm pack`

In a separate project add this to package.json to use this local version:<br>
`"make-pot": "path/to/make-pot-0.0.1.tgz"`

Run npm install and use package as you normally would.


## Roadmap

- [ ] PHP support
- [ ] Blade support
- [ ] Support all WordPress translation functions
- [ ] Option to select output type (POT or JSON)

See the [open issues](https://github.com/freave/make-pot/issues) for a full list of proposed features (and known issues).


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## License

Distributed under the MIT License. See `LICENSE` for more information.


## Credits

Mike van Egmond - [egmond.dev](https://egmond.dev) - mikevanegmond1998@gmail.com<br>
Freave B.V. - [Freave.com](https://www.freave.com) - oss@freave.com
