/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './properties.css';

class Properties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: new Map()
    }
    
  }

  toggleProperty(propertyIndex, evt) {

    evt.preventDefault();
    const { collapsed } = this.state;
    const isCollapsed = collapsed.get(propertyIndex);
    collapsed.set(propertyIndex, !isCollapsed);
    this.setState({ collapsed });

  }


	render() {
    const {collapsed} = this.state;

		return(
    <div className="model-properties">
        <h3>Properties</h3>

        {!this.props.properties.length
          ? <p><em>Select a part to get started</em></p>
          : null
        }

        <div className="panel-group">
          <div className="panel panel-default">
           
            {this.props.properties.map((property, i) => (
             <ul key={i}>
             <div className="panel-heading">
                <h4 className="panel-title">
                  <a data-toggle="collapse" href="#" onClick={this.toggleProperty.bind(this, i)}>{property.category}</a>
                </h4>
              </div>     
                {
                  collapsed.get(i)
                    ? (
                      <div>
                        <ul className="list-group">
                            {property.data.map((item, itemIndex) => (
                              <li key={itemIndex} className="list-group-item">
                                <strong>{item.displayName}:</strong> {item.displayValue}
                              </li>
                            ))}
                        </ul>
                      </div>
                      )
                    : null
                }              
            </ul>
          ))}     
            
          </div>
        </div>
      </div>
		)
	}
}


const PropertiesComponent = connect(
  state => ({ properties: state.properties })
)(Properties);

export default PropertiesComponent;
