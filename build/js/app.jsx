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
  constructor(props) {
    super(props);

    this.state = {
      news: newsData
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div className="app">
        <h3 className="title-head">Новости</h3>
        <Add />
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
      myValue: '',
      disabled: true,
      authorIsEmpty: true,
      textIsEmpty: true
    };

    this.onBtnClick = this.onBtnClick.bind(this);
    this.onCheckRuleClick = this.onCheckRuleClick.bind(this);
  }

  componentWillMount() {
    console.log('before start')
  }

  componentDidMount() {
    console.log('componet start')
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
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
    var author = ReactDOM.findDOMNode(this.refs.author).value;
    var text = ReactDOM.findDOMNode(this.refs.text).value;
    console.log(author, text);
  }

  onCheckRuleClick(ev) {
    this.setState({
      disabled: !ev.target.checked
    })
  }

  onInputValid(fieldName, ev) {
    let state = {};
    if (ev.target.value.trim().length > 0) {
      state[fieldName] = false;
    } else {
      state[fieldName] = true;
    }
    this.setState(state);

  }

  render() {
    let disabledSendBtn = this.state.disabled || this.state.textIsEmpty || this.state.authorIsEmpty;
    return (
      <form name="add_news" className="add_news">
        <label>Author
          <input className="test-input"
                 type="text"
                 placeholder='Your name'
                 onChange={this.onInputValid.bind(this, 'authorIsEmpty')}
                 ref="author"/>
        </label>
        <label>I agree with rules
          <input defaultChecked={false}
                 type="checkbox"
                 onChange={this.onCheckRuleClick}/>
        </label>
        <label>Description
          <textarea defaultValue='' placeholder='Текст новости'
                    onChange={this.onInputValid.bind(this, 'textIsEmpty')}
                    ref="text"/>
        </label>
        <button onClick={this.onBtnClick}
                disabled={disabledSendBtn}>Add
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
