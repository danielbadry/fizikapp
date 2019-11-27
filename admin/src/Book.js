import React, { Fragment } from 'react';
import {Show, RichTextField, TabbedShowLayout, Tab, NumberField,BooleanField,
    ChipField, FileField ,FileInput,
    ImageField, ImageInput, NumberInput, BooleanInput, List, Create,
    Edit, SimpleForm, DisabledInput, TextInput, LongTextInput, ReferenceManyField, Datagrid,
    TextField, DateField,ArrayField,SingleFieldList, SelectInput, ShowButton, EditButton, DeleteButton,
    DateInput ,ReferenceInput } from 'react-admin';
    import { FormDataConsumer, REDUX_FORM_NAME } from 'react-admin';
    import { change } from 'redux-form'

class Book extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            categories:[]
        }
    }
    componentDidMount() {
        fetch(process.env.REACT_APP_API_URL+'/categories/allCategories', { method: 'GET', headers: {}})
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.setState({categories:myJson})
        })
        .catch((e) => {
            // showNotification('Error: comment not approved', 'warning')
        });
    }

    GetSeasons(categoryId){
        let seasons = [];
        for(let season in this.state.categories) {
            if(this.state.categories[season].parentId == categoryId)
                seasons.push(this.state.categories[season]);
        }
        return seasons;
    }

    render() {
        return(
            <React.Fragment>
                <FormDataConsumer>
                    {({ formData, dispatch, ...rest }) => (
                        <Fragment>
                            <SelectInput
                                source="book"
                                label="book"
                                choices={this.state.categories}
                                onChange={value => dispatch(
                                    change(REDUX_FORM_NAME, 'season', null)
                                )}
                                {...rest}
                            />

                            <SelectInput
                                source="season"
                                label="season"
                                choices={this.GetSeasons(formData.book)}
                                {...rest}
                            />
                            
                            <SelectInput
                                source="section"
                                label="section"
                                choices={this.GetSeasons(formData.season)}
                                {...rest}
                            />
                            
                            <SelectInput
                                source="part"
                                label="part"
                                choices={this.GetSeasons(formData.section)}
                                {...rest}
                            />
                        </Fragment>
                    )}
                </FormDataConsumer>
            </React.Fragment>
        )
    }
}
export default Book;