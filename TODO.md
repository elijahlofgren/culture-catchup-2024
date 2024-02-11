# Todo List

## Watch Party Planning

## "Pods" - groups of people that may be friends etc

- e.g. view movies most upvoted by your pod.

### Specific Reports

- **Question**: I want a watch party with these 3 people, what are the top upvoted movies among just these 3 people?

## Report/Badge Ideas

1. **Top Movies**: Most upvotes after subtracting downvotes from upvotes.
2. **Most Loved Movies**: Pure upvote counts.
3. **Most Hated Movies**: Pure downvote counts.
4. **Most Negative**: Highest ratio of downvotes vs upvotes.
5. **Most Downvotes**: List of movies with the highest downvotes.
6. **Most Upvotes**: List of movies with the highest upvotes.
7. **User Votes**: List of movies voted up or down by each user.
8. **You most agree/disagree with these people**: show differences/sameness between voters.

## Useful Queries:

### Full List of all Votes with user first name

Query to select movie titles, vote types, and user names:

```
select m.title, v.up_vote, v.down_vote, u.first_name from votes v
left join users u on v.user_id = u.id
left join movies m on v.movie_id = m.id
```

## Features to Add

- **User-specific Watched List**: Move "Watched" from being a global thing to being a `user_watched` table of user IDs who have watched a given movie.
