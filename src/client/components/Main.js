import React, { Component } from 'react'

export class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            search:{
                keyword:'',
                type:'',
                location:'',
                experience:''
            },
            isAdvanceSearch:false,
            jobs:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    componentDidMount(){
        fetch("api/search").then(data=> data.json()).then(jobs=>{
            this.setState({jobs:jobs.data})
        })
    }
    handleChange(event){
        event.preventDefault();
        let {search} = this.state;
        search[event.target.name] = event.target.value;
        this.setState({search:search});
    }
    handleCheckbox(event){
        // event.preventDefault();
        let {search}=this.state;
        search.type = event.target.value // = search.type[event.target.name] ? false: true
        this.setState({search:search});


    }
    handleClick(){
        let {isAdvanceSearch}=this.state
        this.setState({isAdvanceSearch: (isAdvanceSearch? false:true)})

    }
    handleSubmit(){
        let {search}=this.state;
        let url="api/search?"
        for(let key in search){
            if(search[key]!== ''){
                url = url + `${key}=${search[key]}&`
            }
        }
        url = url.slice(0,-1);
        fetch(url).then(data=>{
            return data.json()
        }).then(jobs=>{
            this.setState({jobs:jobs.data})
        })

    }
    render() {
        let {search,jobs} = this.state;
        let cards = jobs.map(job => {
            return (
            <div style={{marginTop:'10px'}}>
                <div className="card">
                <img src={job.logo} alt="Avatar" style={{width:'10%', height:'10%'}}></img>
                <div className="container">
                    <h4><b>{job.position}</b></h4> 
                    <p>{job.company} | {job.location} | {job.experience} </p> 
                    <p>
                        <b>Skills:</b>{job.skills.shift()}{job.skills.map(skill=>
                            ", "+skill)}
                    </p>
                    <button style={{backgroundColor:"#2794b3"}}> Apply</button>
                </div>
            </div></div>)})
        return (
            <div>
                <div>
                    <input type="text" name="keyword" value={search.keyword} onChange={this.handleChange} placeholder="search by keyword"></input>
                    <input type="checkbox" checked={this.state.search.type === "All"} name="type" value="All" onChange={this.handleCheckbox}/><lable>All</lable>
                    <input type="checkbox" checked={this.state.search.type === "Full Time"} name="type" value="Full Time" onChange={this.handleCheckbox}/><lable>Full Time</lable>
                    <input type="checkbox" checked={this.state.search.type === "Part Time"} name="type" value="Part Time" onChange={this.handleCheckbox}/><label>Part Time</label>
                    <input type="checkbox" checked={this.state.search.type === "Freelancer"} name="type" value="Freelancer" onChange={this.handleCheckbox}/><lable>Freelancer</lable>
                </div>
                <div style={{marginTop:10}}>
                    <a onClick = {this.handleClick} label="Advance Search" name="Advance Search">Advance Search</a> 
                    {
                        (this.state.isAdvanceSearch ? 
                        <div>  
                        <label>Filter by Location:
                            <select onChange={this.handleChange} name="location">
                                <option value="Bangalore">Bangalore</option>
                                <option value="Chennai">Chennai</option>
                                <option value="Pune">Pune</option>
                                <option value="Mumbai">Mumbai</option>
                            </select>
                        </label>
                        <label>Filter by Experience:
                            <select onChange={this.handleChange} name="experience">
                                <option value="0-2 years">0-2 years</option>
                                <option value="1-2 years">1-2 years</option>
                                <option value="2-3 years">2-3 years</option>
                                <option value="3-4 years">3-4 years</option>
                                <option value="4-8 years">4-8 years</option>                                
                            </select>
                        </label>
                        </div>:'' )
                    }
                </div>
                <button  style={{marginTop:10, backgroundColor:'#2794b3'}} name="search" onClick={this.handleSubmit}>Search</button>
                {
                    (
                        jobs.length>0?
                            <>{cards}
                            </>:<div>"no records found"</div>
                        
                    )
                }
            </div>
        )
    }
}

export default Main
