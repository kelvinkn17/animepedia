import {gql} from "@apollo/client";

export const getAnimeList = (page:number, perPage:number) => {
    console.log(`get anime list page ${page} (${perPage} per page)`);

    return gql`
        query{
            Page(page: ${page}, perPage: ${perPage}) {
                pageInfo{
                    currentPage
                    lastPage
                }
                media(sort:  TRENDING_DESC) {
                    id
                    trending
                    popularity
                    title {
                        romaji
                    }
                    coverImage {
                        extraLarge
                        large
                        medium
                        color
                    }
                }
            }
        }
    `;
}

export const getAnimeDetail = (id:string) => {
    console.log(`get anime detail ${id}`);

    return gql`
        query{
          Media(id: ${id}) {
            id
            title {
              romaji
            }
            description
            format
            episodes
            duration
            status
            siteUrl
            source
            genres
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            season
            studios {
              nodes {
                name
              }
            }
            trending
            popularity
            averageScore
            coverImage {
              large
              medium
              color
            }
            bannerImage
            externalLinks {
              type
              site
              icon
              url
            }
            tags {
              name
            }
            characters(page: 1, perPage: 9) {
              nodes {
                id
                name {
                  full
                }
                image {
                  medium
                }
              }
            }
          }
        }
    `;
}