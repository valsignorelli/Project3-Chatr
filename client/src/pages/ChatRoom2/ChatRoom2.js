import React from "react";
import io from "socket.io-client";



class ChatRoom2 extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.newSocket = io('localhost:3001/chat2');

        // this.socket = io('localhost:8080');

        this.newSocket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.newSocket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }
    }


    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">ChatRoom 2</div>
                                <hr/>
                                <div className="messages">
                                {this.state.messages.map(message => {
                                  return (
                                    <div key={message.username}>{message.author}: {message.message}</div>
                                    )
                                  })}
                                </div>
                            </div>
                            <div className="card-footer">
                                    <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                    <br/>
                                    <input type="text" placeholder="Message" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})} className="form-control"/>
                                    <br/>
                                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatRoom2;
