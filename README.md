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
        <li><a href="#Installation">Installation</a></li>
        <li><a href="#Usage">Usage</a></li>
        <li><a href="#CLI%20options">CLI options</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#Credits">Credits</a></li>
  </ol>
</details>

## Getting Started

### Installation

Install with npm:
```bash
npm install --save-dev @freave/make-pot
```

Install with yarn:
```bash
yarn add @freave/make-pot --dev
```

### Usage

```bash
make-pot --source path/to/input/folder --destination path/to/output/folder --domain domain
```

### CLI options

make-pot --help output:
```bash
make-pot <args>

Options:
  --help         Show help                                                      [boolean]
  --version      Show version number                                            [boolean]
  --source       Space-seperated list of directories that should be searched.   [array] [required]
  --destination  Directory where the POT file will be placed.                   [string] [required]
  --domain       The domain that will be used inside the POT file.              [string] [required]
  --headers      The headers that will be added to the POT file.                [string]
                 Example: --headers.Language-Team Acme                        
```

Examples:

```bash
make-pot --source app resources --destination resources/lang --domain freave --headers.Report-Msgid-Bugs-To translations@acme.com --headers.Language-Team Acme
```

This will look for files in the `app` and `resources` directories and will create a POT file in the `resources/lang` directory with the domain `freave` and the headers `Report-Msgid-Bugs-To` and `Language-Team Acme` changed.

## Roadmap

- [x] PHP support
- [x] Blade support
- [x] Support all WordPress translation functions
- [x] POT file header is customizable
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
