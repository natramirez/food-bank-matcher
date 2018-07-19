import React, { Component } from 'react';
import { Button, Card, CardContent, Typography} from 'material-ui';

export class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			teamMembers: [],
			selectedMember: String
		};
		this.selectedMember = 'Peter Mutch'
	}

	componentDidMount() {
		fetch('/api/teamMembers')
			.then(res => res.json())
			.then(json => {
				this.setState({
					teamMembers: json
				});
			});
	}

	getMember(name){
		if (this.state.teamMembers[0]){
			return this.state.teamMembers.find(function(member) {
				return member.name === name
			});
		} else {
			return "User Not Found";
		}
	}

	switchMember(memberName){
		this.selectedMember = memberName;
		this.forceUpdate()
	}

	render() {
		const {image_src, img_alt, img_width, img_height, name, role, experience, goals, hobbies} = this.getMember(this.selectedMember);
		const MemberDescription = (props) => {
			return(
				<div>
					<Typography gutterBottom variant={"title"}> {props.label} </Typography>
					<Typography gutterBottom variant={"subheading"}>{props.value}</Typography>
				</div>
			)
		};

		const MemberButton = (props) => {
		    return(
				<Button onClick={() => this.switchMember(props.fullname)}>
                    {props.firstName}
                    </Button>
            )
        };

		return (
			<div style={{textAlign: "center"}}>
                <MemberButton fullname={"Peter Mutch"} firstName={"Peter"}/>
				<MemberButton fullname={"Sid Bola"} firstName={"Sid"}/>
				<MemberButton fullname={"Alaric Gonzales"} firstName={"Alaric"}/>
				<MemberButton fullname={"Lorraine Goveas"} firstName={"Lorraine"}/>
				<MemberButton fullname={"Albert Fernandez Saucedo"} firstName={"Albert"}/>
				<MemberButton fullname={"Harpreet Singh"} firstName={"Harpreet"}/>

                <Card style={{margin: "24px", padding: "12px"}}>
					<img src={image_src}
                         alt={img_alt}
                         width={img_width}
                         height={img_height}
                         style={{
                             borderRadius: "5px",
							 border: "0.5px solid lightGray",
						 }}
                    />

					<CardContent>
						<Typography variant={"display1"} color={"inherit"}> {name} </Typography>
						<MemberDescription label={"Role"} value={role}/>
						<MemberDescription label={"Experience with role"} value={experience}/>
						<MemberDescription label={"Goals after graduation"} value={goals}/>
						<MemberDescription label={"Hobbies outside of school"} value={hobbies}/>
					</CardContent>
				</Card>

			</div>
		);
	}
}
