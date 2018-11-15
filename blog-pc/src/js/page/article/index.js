import React, { Component } from 'react';
import './style.scss';
import ajax from '../../common/ajax';
import api from '../../common/api-list';
export default class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {
			article: {},
			showInput: false,
			comment: '',
		};
	}
	async componentDidMount() {
		let readRes = await ajax.get(`${api.READ}?article_id=${this.props.match.params.id}`);
		let res = await ajax.get(`${api.ARTICLE}/${this.props.match.params.id}`);
		this.setState({
			article: res.data.data,
		});
	}
	async componentWillReceiveProps(nextProps) {
		let readRes = await ajax.get(`${api.READ}?article_id=${this.props.match.params.id}`);
		let res = await ajax.get(`${api.ARTICLE}/${nextProps.match.params.id}`);
		this.setState({
			article: res.data.data,
		});
	}
	addComment = () => {
		this.setState({
			showInput: true,
		});
	}
	cancel = () => {
		this.setState({
			showInput: false,
			comment: '',
		});
	}
	handleComment = (e) => {
		this.setState({
			comment: e.target.value
		})
	}
	submitComment = async () => {
		if (this.state.comment.trim() === '') return alert('不能为空哦！');
		let data = {
			article_id: this.props.match.params.id,
			content: this.state.comment
		}
		try {
			let res = await ajax.post(`${api.COMMENT}`, data);
			let article = Object.assign({}, this.state.article);
			article.comments.unshift(res.data.data);
			this.setState({
				article: article,
				showInput: false,
				comment: '',
			});
		} catch (err) {
			console.log(err);
		}
	}
	render() {
		return (
			<div className='article-page'>
				{this.state.article.title &&
					<div className='article animated bounceInUp faster'>
						<h1 className='title'>{this.state.article.title}</h1>
						<div className='article-info'>
							<div className='top-info'>
								<div className='username'>作者：{this.state.article.user.name}</div>
								<div className='time'>时间：{this.state.article.created_at}</div>
							</div>
							<span>标签：{this.state.article.tags.map((item, index, arr) => (
								<span key={index} className='tag'>{item.content}</span>
							))}</span>
							<span>阅读：{this.state.article.read}</span>
							<span>LIKE：{this.state.article.like}</span>
						</div>
						<div className='content' dangerouslySetInnerHTML={{ __html: this.state.article.content }}></div>
						<div className='comment'>
							<div className='comment-title' onClick={this.addComment}>{this.state.article.comments.length} 条评论
								<span className='add-comment'><i className='iconfont icon-edit'></i> 添加评论</span>
							</div>
							<div className='comment-input-warp' style={{ maxHeight: this.state.showInput ? '150px' : 0, opacity: this.state.showInput ? 1 : 0 }}>
								<textarea className='comment-input' rows='3' placeholder='说点东西吧...' onChange={this.handleComment} value={this.state.comment}></textarea>
								<div className='submit-comment' onClick={this.submitComment}>确定</div>
								<div className='cancel' onClick={this.cancel}>取消</div>
							</div>
							{this.state.article.comments && (
								<div className='comment-box'>
									{this.state.article.comments.map((item, index) => (
										<div className='comment-item bounceIn animated' key={item.id}>
											<div className='comment-user'>{item.user.name}:</div>
											<div className='comment-time'>{item.created_at}</div>
											<div className='comment-content'>{item.content}</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				}
			</div>
		)
	}
}