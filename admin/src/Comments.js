import React from 'react';

class Comments extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {};
    }
  
    componentDidMount () {
       
    }
    
    render () {
        const Menu = ({data}) => {
            return (
              <ul>
                {data.map((m,i) => {
                  return (<li key={i}>
                    {m.title}
                    {m.children && <Menu data={m.children} />}
                  </li>);
                })}
              </ul>
            );
          }

        let data = [
            {
              title: "Top level 1",
              slug: "top-level-1",
              children: [
                {
                  title: "Sub level 1",
                  slug: "sub-level-1",
                  children: [
                    {
                      title: "Sub Sub Level 1",
                      slug: "sub-sub-level-1",
                      children: [
                        {
                          title: "Sub Sub Level 2",
                          slug: "sub-sub-level-2"
                        }
                      ]
                    }
                  ]
                },
                {
                  title: "Sub level 2",
                  slug: "sub-level-2"
                }
              ]
            },
            {
              title: "Top level 2",
              slug: "top-level 2"
            }
          ];

        return (
            <Menu data={data} />
        )
    }

}

export default Comments;