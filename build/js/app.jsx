let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');

let init = require('./store');
init();

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
  constructor(props) {
    super(props);

    this.state = {
      news: newsData
    };

    this.addNewItem = this.addNewItem.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  addNewItem(name, text, descr) {
    this.state.news.push({
      author: name,
      text: text,
      bigText: descr
    });
    this.setState({
      news: this.state.news
    });
  }


  render() {
    return (
      <div className="app">
        <h3 className="title-head">Новости</h3>
        <Add add={this.addNewItem}/>
        <News data={this.state.news}/>
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

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    return true
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
class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      authorIsEmpty: '',
      textIsEmpty: '',
      fullTextIsEmpty: ''
    };

    this.onBtnClick = this.onBtnClick.bind(this);
    this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
  }

  componentWillMount() {
    console.log('before start')
  }

  componentDidMount() {
    console.log('componet start');
  }

  componentWillUnmount() {
    console.log('delete component');
  }

  componentDidUpdate() {
    console.log('update');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  onBtnClick(ev) {
    ev.preventDefault();

    let author = ReactDOM.findDOMNode(this.refs.author);
    let text = ReactDOM.findDOMNode(this.refs.text);
    let full_text = ReactDOM.findDOMNode(this.refs.full_text);

    this.setState({
      disabled: false,
      authorIsEmpty: '',
      textIsEmpty: '',
      fullTextIsEmpty: ''
    });

    this.props.add(author.value, text.value, full_text.value);
  }

  onCheckRuleClick(ev) {
    this.setState({
      disabled: ev.target.checked
    })
  }

  onInputValid(fieldName, ev) {
    this.setState({
      [fieldName] : ev.target.value
    });
  }

  render() {
    let disabledSendBtn = this.state.disabled && !!this.state.textIsEmpty.trim().length && !!this.state.authorIsEmpty.trim().length && !!this.state.fullTextIsEmpty.trim().length;

    return (
      <form name="add_news" className="add_news">
        <label>Author
          <input className="test-input"
                 type="text"
                 placeholder='Your name'
                 value={this.state.authorIsEmpty}
                 onChange={this.onInputValid.bind(this, 'authorIsEmpty')}
                 ref="author"/>
        </label>
        <label>I agree with rules
          <input checked={this.state.disabled}
                 type="checkbox"
                 onChange={this.onCheckRuleClick}/>
        </label>
        <label>Text
          <textarea placeholder='Текст новости'
                    value={this.state.textIsEmpty}
                    onChange={this.onInputValid.bind(this, 'textIsEmpty')}
                    ref="text"/>
        </label>
        <label>Description
          <textarea placeholder='Полный текст новости'
                    value={this.state.fullTextIsEmpty}
                    onChange={this.onInputValid.bind(this, 'fullTextIsEmpty')}
                    ref="full_text"/>
        </label>
        <button onClick={this.onBtnClick}
                disabled={!disabledSendBtn}>Add
        </button>
      </form>
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
