import React, { Component } from 'react';
import style from 'styled-components';
import Dropzone from 'react-dropzone';

const CenterPage = style.div`
    text-align: center;
`

export class ReportIssue extends Component {

	constructor(props) {
		super(props);

        this.state = {
            damageType: 'Wind Damage',
            locationName: 'name',
            address: 'addr',
            city: 'city',
            state: 'state',
            zip: 'zip',
            postTitle: 'title',
            photoFile: File
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.locationNameChanged = this.locationNameChanged.bind(this);
        this.addressChanged = this.addressChanged.bind(this);
        this.cityChanged = this.cityChanged.bind(this);
        this.stateChanged = this.stateChanged.bind(this);
        this.zipChanged = this.zipChanged.bind(this);
        this.postTitleChanged = this.postTitleChanged.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.testChange = this.testChange.bind(this);
	}

    testChange() {
        var obj = '5b025ab0143c0473719694d9'
        var status = 'verified'

        fetch(`/api/postRecords/${obj}/${status}/changeStatus`, {
            method: 'POST',
        })
    }

    handleChange(event) {
        this.setState({damageType: event.target.value});
    }

    postTitleChanged(event) {
        this.setState({postTitle: event.target.value});
    }

    locationNameChanged(event) {
        this.setState({locationName: event.target.value});
    }

    addressChanged(event) {
        this.setState({address: event.target.value});
    }

    cityChanged(event) {
        this.setState({city: event.target.value});
    }

    stateChanged(event) {
        this.setState({state: event.target.value});
    }

    zipChanged(event) {
        this.setState({zip: event.target.value});
    }


    handleSubmit(event) {
        const name = this.state.locationName
        const type = this.state.damageType
        const city = this.state.city
        const state = this.state.state
        const zip = this.state.zip
        const address = this.state.address
        const postTitle = this.state.postTitle
        const photo = this.state.photoFile

        var photoData = new FormData();
        photoData.append('file', this.state.photoFile);
        photoData.append('filename', this.state.photoFile.name);

        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}`)
            .then(res => res.json())
            .then(json => json.results.map( (result) => {
                const lat = result.geometry.location.lat.toString();
                const lng = result.geometry.location.lng.toString();

                fetch(`/api/postRecords/${type}/${name}/${address}/${city}/${state}/${zip}/${postTitle}/${lat}/${lng}/ReportIssue`, {
                    method: 'POST',
                    body: photoData
                })
                alert('You have succesfully submitted your issue!');

            }));


        event.preventDefault();
    }

    handleDrop(acceptedFiles) {
        this.setState({photoFile: acceptedFiles[0]})

    }


	render() {
		return (
			<CenterPage>

            <form onSubmit={this.handleSubmit}>
                <br/>
                <label>
                    Type of Issue
                    <br/>
                    <select value={this.state.damageType} onChange={this.handleChange}>
                        <option value="Wind Damage">Wind Damage</option>
                        <option value="Tree Damage">Tree Damage</option>
                        <option value="Chemical Spill">Chemical Spill</option>
                        <option value="Oil Spill">Oil Spill</option>
                    </select>
                </label>
                <br/>
                <br/>
                <input type="text" value={this.state.value}
                onChange={this.postTitleChanged}
                placeholder="Post title.."></input>
                <br/>
                <br/>
                <input type="text" value={this.state.value}
                onChange={this.locationNameChanged}
                placeholder="Location Name.."></input>
                <br/>
                <br/>
                <input type="text" value={this.state.value}
                onChange={this.addressChanged}
                placeholder="Address.."></input>
                <br/>
                <br/>
                <input type="text" value={this.state.value}
                onChange={this.cityChanged}
                placeholder="City"></input>
                <br/>
                <br/>
                <input type="text" value={this.state.value}
                onChange={this.stateChanged}
                placeholder="State"></input>
                <br/>
                <br/>
                <input type="text" value={this.state.value}
                onChange={this.zipChanged}
                placeholder="Zip"></input>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>


            <Dropzone onDrop={(files) => this.handleDrop(files)}>
                <div>Add an image to your post</div>
            </Dropzone>

            <img src={this.state.photoFile.preview}
                alt={this.state.photoFile.name}
                width={200}
                height={200} />


			</CenterPage>
		);
	}
}
