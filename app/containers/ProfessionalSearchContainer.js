import { Component } from 'react';

import { ProfessionalSearch } from 'components';

class ProfessionalSearchContainer extends Component {
  professionals = [
    {
      name: 'Migel Carerra',
      city: 'Miami, FL',
      major: 'IT Developer',
      university: 'UHD',
      picture:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0lIiAdHx8kKDosJCY7JysfLT0tLzU9Ojo6Iys1Oz84TTRCRUEBCgoKDQwNDgUNEy0ZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIADwAPAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAHCAAGAQQFAwL/xAA3EAABAwIEAwUFBgcAAAAAAAABAgMEBREABhIhEzFBB1FSYZEUFSKB0SMyQnGxwQhTYoKh8PH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwA4YnXExCcBOuM4H9bz3U36lIpOSqKqrSo6tD8latLDK/De4ufmMVer5m7XqYC9IoUUtAXIjs8YAf2rJwBnxBgAU3t3rEeRorVIiOoBsoMFTS0+pP7YLuUM50fN0QvUp8lxA+1juCzjf5ju8xtgLEMTGcTAYxyM0yJLNGfRADhlvDhshoXXc8ykHa4FyL7bb2x18VavM1KqJlP0F5CZMZCo7XGUpKFqO6/iTuLEJFx4VDa98B55DqMAxXKJHpr9KlQAOJDkW1kHk5cbKueZ78WzFWoDpjo49TbSZqC3G1pUXChS9OpAWSSRq+K1zYW32sOfmaoxJlVTTxXqtBdOopENbSQCj7xsRrUB16bHuOA3835BoOa2lmdES1LI+GWyNLgPmfxfkcLzVIda7Mc4pSy/Z9mzjLqb6Xmz3juNiCPLDN0FFUYZcj1WQ3M0WLMxCAgupPiSNgod42NxywuXbbXE1nPMltsEN09PsouOZSSVH1JHywDC5KzNFzXQGKpFskr+F1q9y0sc0n/eRGO9hcf4f68uBmxdJWo+z1Bo2TfYOIBUD6ah6YY/AYPI4rtBckOUmCwjd1LTbkpZFgorGpQB77m//bgF1XtszVNWfYzEgtm4Aba1n5lV/wBBgrzKzVIWQKBWqYzIfSiOwuWzHSkrU2psXIuk8jY9Nr7jAWKoRkhpgU5hfEpjvHQzoKUukoUnSFEWJOo7772vjak0Kmyp6Kg9ER7ahBQmQglDlj01Ag2xWsp57NelNR002cUuJJLyoi20tn+q9028wrn0xcISnlxW1SkhDxF1JHTAfLq41Mp63F6WYsZok9AhCR+wwoVaj1SpvTswOwJQiSZC3FSC0rh3Wom2rlhvZ4irjqZmoQ408CgtKTqDmxJFuuwO2At20ZgSaS5TeGptLjmmO04jQoNjhnVp52uk8+eodxsFD7IIz0ntEo/AB+zcU4sjokJN7/p88NgMLl2K5kytlf2yTWpa2Z8izaDwVKShsb8wDuT+gwbYudMrymUvM16nFB5apKUn0JBGATzDddnzq3Ml5d4PCWx7A0lxWvdJCQNtt9wQeWFf91MeJz1H0wR+ymTLgRKy3GnSUojRTIZQXLpQsc/h5G/W4xKlMBbGhMqbbLpjx0mRL/koP3fNR/CPM/K/LGhTZMltnU9IXIWsaip0AW8gEgD/ABjxrlTkstMNsKS0X5CGlLSPiSDzIvtfClVntczicv5dEZnSuqvnhodb2EdWndST4gDt1GoH81ulSX5b635TzjzyzdTjiipSj5k4LfbTHbeqVNigFtliMVpSk81KWdRJNySbDfA491MeJz1H0wpXFxMdr3Ux4nPUfTE91MeJz1H0wpX/2Q==',
      about: 'bla blah',
      cost: '20',
      per: 'per hour',
      rating: '3',
      reviews: '10'
    },
    {
      name: 'Migel Carerra',
      city: 'Miami, FL',
      major: 'IT Developer',
      university: 'UHD',
      picture:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0lIiAdHx8kKDosJCY7JysfLT0tLzU9Ojo6Iys1Oz84TTRCRUEBCgoKDQwNDgUNEy0ZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIADwAPAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAHCAAGAQQFAwL/xAA3EAABAwIEAwUFBgcAAAAAAAABAgMEBREABhIhEzFBB1FSYZEUFSKB0SMyQnGxwQhTYoKh8PH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwA4YnXExCcBOuM4H9bz3U36lIpOSqKqrSo6tD8latLDK/De4ufmMVer5m7XqYC9IoUUtAXIjs8YAf2rJwBnxBgAU3t3rEeRorVIiOoBsoMFTS0+pP7YLuUM50fN0QvUp8lxA+1juCzjf5ju8xtgLEMTGcTAYxyM0yJLNGfRADhlvDhshoXXc8ykHa4FyL7bb2x18VavM1KqJlP0F5CZMZCo7XGUpKFqO6/iTuLEJFx4VDa98B55DqMAxXKJHpr9KlQAOJDkW1kHk5cbKueZ78WzFWoDpjo49TbSZqC3G1pUXChS9OpAWSSRq+K1zYW32sOfmaoxJlVTTxXqtBdOopENbSQCj7xsRrUB16bHuOA3835BoOa2lmdES1LI+GWyNLgPmfxfkcLzVIda7Mc4pSy/Z9mzjLqb6Xmz3juNiCPLDN0FFUYZcj1WQ3M0WLMxCAgupPiSNgod42NxywuXbbXE1nPMltsEN09PsouOZSSVH1JHywDC5KzNFzXQGKpFskr+F1q9y0sc0n/eRGO9hcf4f68uBmxdJWo+z1Bo2TfYOIBUD6ah6YY/AYPI4rtBckOUmCwjd1LTbkpZFgorGpQB77m//bgF1XtszVNWfYzEgtm4Aba1n5lV/wBBgrzKzVIWQKBWqYzIfSiOwuWzHSkrU2psXIuk8jY9Nr7jAWKoRkhpgU5hfEpjvHQzoKUukoUnSFEWJOo7772vjak0Kmyp6Kg9ER7ahBQmQglDlj01Ag2xWsp57NelNR002cUuJJLyoi20tn+q9028wrn0xcISnlxW1SkhDxF1JHTAfLq41Mp63F6WYsZok9AhCR+wwoVaj1SpvTswOwJQiSZC3FSC0rh3Wom2rlhvZ4irjqZmoQ408CgtKTqDmxJFuuwO2At20ZgSaS5TeGptLjmmO04jQoNjhnVp52uk8+eodxsFD7IIz0ntEo/AB+zcU4sjokJN7/p88NgMLl2K5kytlf2yTWpa2Z8izaDwVKShsb8wDuT+gwbYudMrymUvM16nFB5apKUn0JBGATzDddnzq3Ml5d4PCWx7A0lxWvdJCQNtt9wQeWFf91MeJz1H0wR+ymTLgRKy3GnSUojRTIZQXLpQsc/h5G/W4xKlMBbGhMqbbLpjx0mRL/koP3fNR/CPM/K/LGhTZMltnU9IXIWsaip0AW8gEgD/ABjxrlTkstMNsKS0X5CGlLSPiSDzIvtfClVntczicv5dEZnSuqvnhodb2EdWndST4gDt1GoH81ulSX5b635TzjzyzdTjiipSj5k4LfbTHbeqVNigFtliMVpSk81KWdRJNySbDfA491MeJz1H0wpXFxMdr3Ux4nPUfTE91MeJz1H0wpX/2Q==',
      about: 'bla blah',
      cost: '19',
      per: 'per hour',
      rating: '3',
      reviews: '10'
    },
    {
      name: 'Fedor Cherep',
      city: 'Miami, FL',
      major: 'PHP Programmer',
      university: 'PHD',
      picture:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMFR0UHhAYIB0iIiAdHyUkHiggJiYmKx8eITkiJS08Ly4uIx81ODUtNy0tLi0BCgoKDQwNFQ8PFSsZFRktLSsrKysrKystKy03NysrKysrNysrKysrKys3Ny0tKysrKysrKysrKysrKysrKysrK//AABEIADwAPAMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAHAAUGCAECBAP/xAAzEAACAQMCBAQEAwkAAAAAAAABAgMABBEFBgcSIUExUXGBEyJhkQgUMhUWM0JTobHB4f/EABcBAAMBAAAAAAAAAAAAAAAAAAECAwD/xAAcEQEBAAICAwAAAAAAAAAAAAABAAIRITEDEkH/2gAMAwEAAhEDEQA/ADhWkjqis7kBVGST2FelDnjnq9zpeyZEtGKNdzLA7A4IUgk49cYrWm3V+NmiW8VxFZWtzLcqCIiwXlJ7EkHw70LtR4qbuurl5Y9Ukt42bKxRBQFA7eFeew9kncVwHvJzBbg/pQZZvTyokWnBTRjeRyNeXUlsDloWwCfcUvudRMWju3eOGr2YEeuWsd+mf4iH4bD7DBov7K3npW77SSbTWdJIjiWCXAZM+B6eIPnQx3fwWjRJLnblwy8qki2mPNk+QNQrhjqVztniDZR3PNCJJfytwj9MBjjr6HB9qJkMErVUqVKja1UkgEjB8qEP4j5Sug6TAFJ57pmz6L/2i8pJAyMeYoUfiIVDtnT3ZHMq3eI2XwXKHOftWtRbhqlwLeKZOYAsFyfDp0o0WLOGT5h1XPjVQra/vLVgba5miI8ORiMUT/2vuNOFqazBfzCZbkRPIv6ljzgHPrgZ+tTcEZx4j1csyxgnqfOqy8V+S33zPNa/JJlHYjp83nUcbcuuvOJ31i/aUHIcytn/ADTvrFnrevDRrm7hkmvb9GSF2AUyKh6MT7nqewomOstw3srVabcfm9Ptbj+tCj9PqAf911U1bajMW3tNjMiSFLWNS6EEMQoGQe4p1p5ZUIuP63Mlno8KRk2pmkMjjs3L8o+xai7TPufRLPXtLe1vYfiBcvHgleVwDg5FBidwJ2jo23ZNMlvbi1WSe1UuTITgEDPUZwamexNX0BdtR6RfXttLJcTyK0UowJSScqB70LIbp7Sxu7KYMsc7csgUdenapvsIadpVrHL+615dOGDmZ/huVYHoygnPsKlp+1Dk4pqdgbLsl/MposTZOcSM7AexNbvpbalqEF3p7w2osIXSASIGUcxXIx5cqke9by63FqGnySQpJEQ5QxyqUIb6g9a9dtwXNxqUSq4NhHC/xlwPncleX7daG3Jg6KW6dGkVjAkaKiqgwq+A6dvpXVWAABgVmrlOVYrNKtaBPFHQotP3N+YtI8QyqJpolHUZJDMvmMjr5Zru2/Dsy2+HcCf4d2FGGaTv6GmXjnfXMe+7eFJnEaWkfIB/LzM2ceuBQx1OdzKF6DIBJHepptmFCJ28N6WyTm10qc3U2MF1Pyr71LOD24DcNJp1xgySJ8RX7sw8c/f+1ASxAGMd/Gp9sa5lttx6e0LcvJIvTzycHPtT4+MKWWbusnSpUqM9/9k=',
      about:
        'The background shorthand property sets all the background properties in one declaration. The properties that can be set, are: background-color, background-image, background-position, background-size, background-repeat, background-origin, background-clip, and background-attachment. It does not matter if one of the values above are missing, e.g. background:#ff0000 url(smiley.gif); is allowed.',
      cost: '10',
      per: 'per minute',
      rating: '2',
      reviews: '50'
    },
    {
      name: 'Kira  Kan',
      city: 'San-Francisco, CA',
      major: 'Java Programmer',
      university: 'MIT',
      picture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIy5EjptwTM67zG5B3V0ykLU2dxspnvJJ2WYIAhrzu9w47_-abVg',
      about: 'bla blah',
      cost: '50',
      per: 'per sec',
      rating: '5',
      reviews: '100'
    }
  ];
  professions = ['IT Developer', 'Java Programmer', 'PHP Programmer'];
  universities = ['UHD', 'PHD', 'MIT'];
  render() {
    return (
      <ProfessionalSearch
        professionals={this.professionals}
        professions={this.professions}
        universities={this.universities}
      />
    );
  }
}

export default ProfessionalSearchContainer;
