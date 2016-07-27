let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');

let newsData = [
  {
    author: 'Max',
    text: 'Webpack favorite task manager',
    bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  },
  {
    author: 'Polina',
    text: 'I agree',
    bigText: 'А евро 42!'
  },
  {
    author: 'Misha',
    text: 'No, fo me gulp is my life',
    bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
  }
];

// Start App
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <h3 className="title-head">Новости</h3>
        <TestInput />
        <News data={newsData}/>
      </div>
    );
  }
}

// News-list and wrapper
class News extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0
    };
  }

  render() {
    let listNews = this.props.data;
    let renderListNews;

    if (listNews.length > 0) {
      renderListNews = listNews.map((item, index) => {
        return (
          <div key={index} className={'news-list__item ' + 'news-item '}>
            <Article data={item}/>
          </div>
        )
      });
    } else {
      renderListNews = <p className="color-error">К сожалению новостей нет</p>
    }

    return (
      <div className="news-list">
        {renderListNews}
        <p className={listNews.length > 0 ? 'lenght-news' : 'none'}>News count - {listNews.length}</p>
      </div>
    )
  }
}
// Свойство обязательно
News.propTypes = {data: React.PropTypes.array.isRequired};

// Article
class Article extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.readmoreClick = this.readmoreClick.bind(this);
  }

  readmoreClick(ev) {
    ev.preventDefault();
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {
    let data = this.props.data,
      visible = this.state.visible;

    return (
      <div className="news-item__article">
        <p className="news-item__author">{data.author}</p>
        <p className="news-item__text">{data.text}</p>
        <a href="#" className={'news__read-more' + (visible ? 'none' : '')} onClick={this.readmoreClick}>read more</a>
        <p className={'big-text ' + (visible ? '' : 'none')}>{data.bigText}</p>
      </div>
    )
  }
}

// Input
class TestInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myValue: ''
    };

    this.onBtnClick = this.onBtnClick.bind(this);
  }

  onBtnClick() {
    alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
  }

  render() {
    return (
      <div>
        <input className="test-input" type="text" defaultValue='' ref="myTestInput"/>
        <button onClick={this.onBtnClick}>Show value</button>
      </div>
    );
  }
}

Article.propTypes = {
  data: React.PropTypes.shape({
    author: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    bigText: React.PropTypes.string.isRequired
  })
};

ReactDOM.render(
  <App />,
  $('#body')[0]
);
