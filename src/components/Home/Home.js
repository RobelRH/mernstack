import React, {useState, useEffect} from 'react'
import { Container, Grid, Grow } from '@material-ui/core'
import { useDispatch } from 'react-redux'

import useStyles from './styles.js'
import Form from '../Form/Form.js'
import Posts from '../Posts/Posts.js'
import { getPosts } from '../../actions/posts.js'

const Home = () => {

    const classes = useStyles()
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <Grow in>
            <Container>
              <Grid  className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
              </Grid>
            </Container>
        </Grow>
    )
}

export default Home
